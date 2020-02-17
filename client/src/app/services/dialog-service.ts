import {ButtonProps} from '@material-ui/core/Button';
import {action, observable} from 'mobx';
import {ComponentType} from 'react';
import {Inject, Injectable} from 'react-ts-di';
import UUID from 'uuid';

import {Loading, ConfirmDialog} from '../components';

import {Time, TimeUnit} from './time';
import {Toast} from './toast';

interface LoadingOptions {
  timeout: TimeUnit;
}

export type CloseOptions = Partial<ParsedCloseOptions>;

export interface ParsedCloseOptions {
  isDestroy: boolean;
}

export interface DialogComponentProps {
  close(data?: unknown, options?: CloseOptions): void;
}

export interface DialogRef {
  onClose(dialogData: unknown): void;
}

export interface BaseActionButtons {
  text: string;
  props?: ButtonProps;
}

type ActionButtonCB<R extends boolean | void | Promise<boolean | void>> = (
  dialogData: unknown,
) => R;

export interface ActionButtons extends BaseActionButtons {
  /** return a bool value to determine whether to throw a value out */
  cb?: ActionButtonCB<boolean | void | Promise<boolean | void>>;
}

export interface ParsedActionButtons extends BaseActionButtons {
  cb?: ActionButtonCB<boolean | void | Promise<boolean | void>>;
}

export interface DialogOptions<T = ParsedActionButtons, P extends object = object> {
  title: string;
  isClickAwayClose?: boolean;
  isFullScreen?: boolean;
  actionButtons?: T[];
  componentProps?: P;
}

export interface DialogConfig {
  isShow: boolean;
  dialogData?: unknown;
  content: ComponentType;
  options: DialogOptions;
}

type DialogID = string;

/**
 * -- 用于调用对话框
 *
 * close 被封装在每个组件的 props 里，在使用的时候需要使用 DialogComponentProps,
 * 注意，调用 close 并不会关闭对话框，如需要立即关闭，需要显式的设置 isDestroy 字段为 true
 *
 * close(dialogData, {isDestroy: true})
 *
 * 这样做是为了兼容底部的动作按钮，有时候在组件内部调用 close 并不想去关闭，而是想把组件内部的
 * DialogData 向下层传递到动作按钮的回调中，等待下一步处理（真正关闭对话框并吐出数据给调用者的叫 spurt 方法）
 * 如果立即关闭，dialogData 将会直接到 dialogRef 当中，如果数据传递到 action btn，调用 spurt 之后才会到 dialogRef 中
 *
 * -- 关于 ActionButton
 *
 * 调用对话框时可以显式的传入 cbs 一系列的回调，它会去动态渲染一系列的 action button，这个按钮的 cb 签名形如:
 *
 * cb(dialogData: unknown): boolean | void
 *
 * dialogData 是上游传递过来的需要处理的数据，返回值可以是 void 也可以是 boolean，有时候你可能不想点击按钮马上关闭对话框，
 * 而是做一些其他的操作，这时候返回 false 可以终止关闭对话框，反之，返回 void 或者 true 都会马上关闭
 *
 * @author Younccat
 */
@Injectable()
export class DialogService {
  @Inject
  private toast!: Toast;

  @observable
  dialogs = new Map<DialogID, DialogConfig>();

  @observable
  currentDialogID: DialogID | undefined;

  /** 主动调起 service 关闭 */
  kill(dialogID: DialogID): void {
    if (dialogID === this.currentDialogID) {
      this.spurt();
    }
  }

  async open(
    content: ComponentType,
    options: DialogOptions<ActionButtons>,
  ): Promise<DialogRef> {
    const {actionButtons = []} = options;
    const dialogID = UUID.v4();

    return new Promise(resolve => {
      /** 用于外部接收吐出消息的回调 */
      const onClose = <T>(cb: (data: T) => void): void => {
        const {dialogData} = this.dialogs.get(dialogID)!;

        cb(dialogData as T);
        this.dialogs.delete(dialogID);
      };
      const op: DialogOptions = {
        ...options,
        actionButtons: actionButtons.map(button => ({
          ...button,
          cb: (() => {
            const {dialogData} = this.dialogs.get(dialogID)!;
            const {cb = (): void => {}} = button;

            /** 通过上层对话框组件调用 close 将数据传递到动作按钮的回调 */
            if (cb(dialogData) === false) {
              return;
            }

            this.spurt();
            resolve({onClose});
          }) as ActionButtonCB<void>,
        })),
        componentProps: {
          ...(options.componentProps ?? {}),
          close: (data: unknown, options: CloseOptions): void => {
            const {isDestroy} = this.parseOptions(options || {});

            // 暂存 dialogData 有些场景下，调用 close 并不会关闭 dialog，而是等待 下方 footer 按钮关闭
            if (this.currentDialogID) {
              const config = this.dialogs.get(this.currentDialogID)!;

              config.dialogData = data;
              this.dialogs.set(this.currentDialogID, config);
            }

            if (isDestroy) {
              this.spurt();
              resolve({onClose});
            }
          },
        },
      };

      this.dialogs.set(dialogID, {
        isShow: true,
        content,
        options: op,
      });
      this.currentDialogID = dialogID;
    });
  }

  async loading(
    cb: (...args: unknown[]) => Promise<void> | void,
    options?: LoadingOptions,
  ): Promise<void> {
    const {timeout} = options || {timeout: 10 * Time.Second};
    const timeoutId = setTimeout(() => {
      this.closeLoading();
      this.toast.warning('操作太长时间啦！');
    }, timeout);

    this.openLoading();

    try {
      await cb();
    } catch (e) {
      clearTimeout(timeoutId);
    }

    this.closeLoading();
    clearTimeout(timeoutId);
  }

  /** confirm dialog */
  confirm(
    title: string,
    content: string,
    onSureClick?: () => void,
    onCancelClick?: () => void,
  ): Promise<DialogRef> {
    const cbify = (func?: Function): boolean => {
      const caller = (): void => {};

      (func || caller)();

      return true;
    };

    return this.open(ConfirmDialog, {
      title,
      componentProps: {
        content,
      },
      actionButtons: [
        {text: '我再想想', cb: () => cbify(onCancelClick)},
        {text: '好', cb: () => cbify(onSureClick)},
      ],
    });
  }

  private parseOptions(options: CloseOptions): ParsedCloseOptions {
    return {
      isDestroy: false,
      ...options,
    };
  }

  private openLoading(): void {
    this.open(Loading, {
      title: '',
      componentProps: {},
    });
  }

  private closeLoading(): void {
    if (!this.currentDialogID) {
      return;
    }

    this.spurt();
    this.dialogs.delete(this.currentDialogID);
  }

  /** throw value and close current dialog */
  @action
  private spurt(): void {
    if (!this.currentDialogID) {
      return;
    }

    const ref = this.dialogs.get(this.currentDialogID);

    if (ref) {
      ref.isShow = false;
    }
  }
}
