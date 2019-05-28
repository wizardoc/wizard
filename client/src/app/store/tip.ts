import {action, computed, observable} from 'mobx';

const MAX_EXIST_DURATION = 5 * 1000;

export class TipStore {
  private deferId: NodeJS.Timeout | undefined;

  @observable
  private _isShowTip = false;

  init(): void {
    if (this.deferId) {
      clearTimeout(this.deferId);
    }

    this._isShowTip = false;
  }

  @action
  tipToggle(): void {
    this.init();
    this._isShowTip = true;

    this.deferId = setTimeout(
      () => (this._isShowTip = false),
      MAX_EXIST_DURATION,
    );
  }

  @computed
  get isShowTip(): boolean {
    return this._isShowTip;
  }
}
