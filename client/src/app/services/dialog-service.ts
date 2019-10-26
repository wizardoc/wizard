import {ButtonProps} from '@material-ui/core/Button';
import {action, observable} from 'mobx';
import {ComponentType} from 'react';
import {Inject, Injectable} from 'react-ts-di';
import UUID from 'uuid';

import {Loading} from '../components';

import {ErrorManager} from './error-manager';
import {Time, TimeUnit} from './time';
import {Toast} from './toast';

interface LoadingOptions {
  timeout: TimeUnit;
}

export interface CloseOptions {
  isDestroy: boolean;
}

export interface WithDialog {
  close?(data?: unknown, options?: CloseOptions): void;
}

export interface DialogRef {
  onClose(dialogData: unknown): void;
}

export interface BaseActionButtons {
  text: string;
  props?: ButtonProps;
}

type ActionButtonCB<R extends boolean | void, T = Element, E = MouseEvent> = (
  e: React.MouseEvent<T, E>,
) => R;

export interface ActionButtons extends BaseActionButtons {
  /** return a bool value to determine whether to throw a value out */
  cb: ActionButtonCB<boolean>;
}

export interface ParsedActionButtons extends BaseActionButtons {
  cb: ActionButtonCB<void>;
}

export interface DialogOptions<T = ParsedActionButtons> {
  title: string;
  isClickAwayClose?: boolean;
  isFullScreen?: boolean;
  actionButtons?: T[];
  componentProps?: unknown;
}

export interface DialogConfig {
  isShow: boolean;
  dialogData?: unknown;
  content: ComponentType;
  options: DialogOptions;
}

type DialogID = string;

@Injectable()
export class DialogService {
  @Inject
  private toast!: Toast;

  @Inject
  private errorManager!: ErrorManager;

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
          cb: (e => {
            if (button.cb(e)) {
              this.spurt();
            }

            resolve({onClose});
          }) as ActionButtonCB<void>,
        })),
        componentProps: {
          ...(options.componentProps || {}),
          close: (data: unknown, options: CloseOptions): void => {
            if (options) {
              const {isDestroy} = options;

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
      this.errorManager.spurtError(e);
    }

    this.closeLoading();
    clearTimeout(timeoutId);
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
