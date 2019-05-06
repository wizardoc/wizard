import {action, observable} from 'mobx';

export class AccessDialogStore {
  @observable
  private isViewAccessDialog = false;

  @action
  accessDialogToggle(): void {
    this.isViewAccessDialog = !this.isViewAccessDialog;
  }

  get isAccessView(): boolean {
    return this.isViewAccessDialog;
  }
}
