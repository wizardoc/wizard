import {ButtonProps} from '@material-ui/core/Button';
import {observable} from 'mobx';
import {ComponentType} from 'react';
import {Injectable} from 'react-ts-di';
import UUID from 'uuid';

import {Loading} from '../components';

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
  actionButtons?: T[];
  componentProps: unknown;
}

@Injectable()
export class DialogService {
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
          ...options.componentProps,
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
  ): Promise<void> {
    this.openLoading();
    await cb();
    this.closeLoading();
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
