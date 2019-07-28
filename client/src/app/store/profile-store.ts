import {action, computed, observable} from 'mobx';

export class ProfileStore {
  @observable
  private _isViewProfilePanel = false;

  @action
  toggleViewProfilePanel = (): void => {
    this._isViewProfilePanel = !this._isViewProfilePanel;
  };

  @computed
  get isViewProfilePanel(): boolean {
    return this._isViewProfilePanel;
  }
}
