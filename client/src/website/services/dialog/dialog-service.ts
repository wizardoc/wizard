import {action, observable} from 'mobx';
import {ComponentType, ClassAttributes} from 'react';
import {Inject, Injectable} from '@wizardoc/injector';
import UUID from 'uuid';

import {NormalLoading} from '../../components';
import {Time, TimeUnit} from '../time';
import {Toast} from '../toast';

import {
  DialogID,
  DialogOptions,
  DialogPool,
  ParsedActionButtons,
  DialogConfig,
} from './dialog-pool';

interface LoadingOptions {
  timeout: TimeUnit;
}

export interface ActionDialog {
  actionButtons(): ParsedActionButtons[];
}

export interface DialogComponentProps {
  close(data?: unknown): void;
}

export interface DialogRef {
  onClose(dialogData: unknown): void;
}

@Injectable()
export class DialogService {
  @Inject
  private toast!: Toast;

  @Inject
  private dialogPool!: DialogPool;

  @observable
  currentDialogID: DialogID | undefined;

  private previousDialogID: DialogID | undefined;

  /** 主动调起 service 关闭 */
  kill(dialogID: DialogID): void {
    if (dialogID === this.currentDialogID) {
      this.closeDialog(dialogID);
    }
  }

  async open<P = any, T = any>(
    content: ComponentType<P & ClassAttributes<T>>,
    options: DialogOptions,
  ): Promise<DialogRef> {
    const dialogID = UUID.v4();

    // 构造调用链
    if (!!this.currentDialogID) {
      this.previousDialogID = this.currentDialogID;
    }

    return new Promise(resolve => {
      let currentConfig: DialogConfig | undefined;

      /** 用于外部接收吐出消息的回调 */
      const onClose = <T>(cb: (data: T) => void): void => {
        if (!currentConfig) {
          throw new Error('Cannot invoke onClose before close.');
        }

        const {dialogData} = currentConfig;

        cb(dialogData as T);
      };
      const op: DialogOptions = {
        ...options,
        componentProps: {
          ...(options.componentProps ?? {}),
          close: (data: unknown): void => {
            if (!this.currentDialogID) {
              throw new Error('There is no activated dialog.');
            }

            const config = this.dialogPool.dialogs.get(this.currentDialogID)!;

            config.dialogData = data;
            currentConfig = {...config};

            this.closeDialog();

            resolve({onClose});
          },
        },
      };

      this.dialogPool.dialogs.set(dialogID, {
        isShow: true,
        content,
        options: op,
      });
      this.currentDialogID = dialogID;
    });
  }

  async loading<T = any>(
    cb: (...args: unknown[]) => Promise<T> | T,
    options?: LoadingOptions,
  ): Promise<T> {
    const {timeout} = {
      ...(options ?? {}),
      timeout: 10 * Time.Second,
    };
    const timeoutId = setTimeout(() => {
      this.closeLoading();
      this.toast.warning('操作太长时间啦！');
    }, timeout);

    this.openLoading();

    const value = await cb();

    this.closeLoading();
    clearTimeout(timeoutId);

    return value;
  }

  private openLoading(): void {
    this.open(NormalLoading, {
      title: '',
      hasTemplate: false,
    });
  }

  private closeLoading(): void {
    if (!this.currentDialogID) {
      return;
    }

    this.closeDialog(this.currentDialogID);
  }

  @action
  private hideDialog(id: string): void {
    const config = this.dialogPool.dialogs.get(id);

    if (config) {
      config.isShow = false;
    }
  }

  private deleteDialog(id: string): void {
    this.dialogPool.dialogs.delete(id);

    // reset id of dialog
    this.currentDialogID = this.previousDialogID ?? undefined;
  }

  private closeDialog(id?: string): void {
    const closeID = id ?? this.currentDialogID!;

    this.hideDialog(closeID);
    this.deleteDialog(closeID);
  }
}
