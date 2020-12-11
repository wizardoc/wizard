import {ButtonProps} from '@material-ui/core/Button';
import {Injectable} from '@wizardoc/injector';
import {observable} from 'mobx';
import {ComponentType, ClassAttributes} from 'react';

export type DialogID = string;

export interface DialogConfig<P = any, T = any> {
  isShow: boolean;
  dialogData?: unknown;
  content: ComponentType<P & ClassAttributes<T>>;
  options: DialogOptions;
}

export interface DialogOptions<P extends object = object> {
  title: string;
  isClickAwayClose?: boolean;
  isFullScreen?: boolean;
  componentProps?: P;
  // 去掉 dialog 模版
  hasTemplate?: boolean;
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
  dialogs = observable.map<DialogID, DialogConfig>();

  constructor() {
    (window as any).dialogs = this.dialogs;
  }
}
