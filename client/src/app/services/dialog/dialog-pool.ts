import {ButtonProps} from '@material-ui/core/Button';
import {Injectable} from '@wizardoc/injector';
import {observable} from 'mobx';
import {ComponentType} from 'react';

export type DialogID = string;

export interface DialogConfig {
  isShow: boolean;
  dialogData?: unknown;
  content: ComponentType;
  options: DialogOptions;
}

export interface DialogOptions<
  T = ParsedActionButtons,
  P extends object = object
> {
  title: string;
  isClickAwayClose?: boolean;
  isFullScreen?: boolean;
  actionButtons?: T[];
  componentProps?: P;
}

export interface ParsedActionButtons extends BaseActionButtons {
  cb?: ActionButtonCB<boolean | void | Promise<boolean | void>>;
}

export interface BaseActionButtons {
  text: string;
  props?: ButtonProps;
}

export type ActionButtonCB<
  R extends boolean | void | Promise<boolean | void>
> = (dialogData: unknown) => R;

export interface ActionButtons extends BaseActionButtons {
  /** return a bool value to determine whether to throw a value out */
  cb?: ActionButtonCB<boolean | void | Promise<boolean | void>>;
}

@Injectable()
export class DialogPool {
  @observable
  dialogs = new Map<DialogID, DialogConfig>();
}
