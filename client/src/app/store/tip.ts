import {action, computed, observable} from 'mobx';

const MAX_EXIST_DURATION = 5 * 1000;

export class TipStore {
  @observable
  private _isShowTip = false;

  @action
  tipToggle(): void {
    this._isShowTip = false;
    this._isShowTip = true;

    setTimeout(() => (this._isShowTip = false), MAX_EXIST_DURATION);
  }

  @computed
  get isShowTip(): boolean {
    return this._isShowTip;
  }
}
