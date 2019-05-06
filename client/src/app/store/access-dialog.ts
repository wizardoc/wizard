import {action, observable} from 'mobx';

export class AccessDialog {
  @observable
  private isViewRegisterDialog = false;

  @observable
  private isViewLoginDialog = false;

  @action
  registerDialogToggle(): void {
    this.isViewRegisterDialog = !this.isViewRegisterDialog;
  }

  @action
  loginDialogToggle(): void {
    this.isViewLoginDialog = !this.isViewLoginDialog;
  }

  get isRegisterView(): boolean {
    return this.isViewRegisterDialog;
  }

  get isLoginView(): boolean {
    return this.isViewLoginDialog;
  }
}
