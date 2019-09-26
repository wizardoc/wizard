import {ButtonProps} from '@material-ui/core/Button';
import {observable} from 'mobx';
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
  close?(data: unknown, options?: CloseOptions): void;
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

@Injectable()
export class DialogService {
  @Inject
  private toast!: Toast;

  @Inject
  private errorManager!: ErrorManager;

  @observable
  dialogs = new Map<string, DialogOptions>();

  @observable
  isShow = false;

  @observable
  content: ComponentType | undefined;

  @observable
  currentDialogID: string | undefined;

  private stashDialogData: unknown;
  private dialogData: unknown;

  /** 主动调起 service 关闭 */
  kill(dialogID: string): void {
    if (dialogID === this.currentDialogID) {
      this.spurt();
    }
  }

  async open(
    content: ComponentType,
    options: DialogOptions<ActionButtons>,
  ): Promise<DialogRef> {
    const {actionButtons = []} = options;

    return new Promise(resolve => {
      const onClose = <T>(cb: (data: T) => void): void => {
        cb(this.dialogData as T);
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

              this.stashDialogData = data;

              if (isDestroy) {
                this.spurt();
                resolve({onClose});
              }
            }
          },
        },
      };
      const dialogID = UUID.v4();

      this.dialogs.set(dialogID, op);
      this.currentDialogID = dialogID;
      this.content = content;
      this.isShow = true;
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

  /** throw value */
  private spurt(): void {
    this.isShow = false;
    this.dialogData = this.stashDialogData;
  }
}
