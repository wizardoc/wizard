import {action, computed, observable} from 'mobx';

export class Tip {
  @observable
  private _isShowTip = false;

  @action
  tipToggle(): void {
    this._isShowTip = !this._isShowTip;
  }

  @computed
  get isShowTip(): boolean {
    return this._isShowTip;
  }
}
