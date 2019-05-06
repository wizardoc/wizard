import {action, observable} from 'mobx';

export class LoadingStore {
  @observable
  private isViewLoadingDialog: boolean = false;

  @action
  loadingDialogToggle(): void {
    this.isViewLoadingDialog = !this.isViewLoadingDialog;
  }

  get isView(): boolean {
    return this.isViewLoadingDialog;
  }
}
