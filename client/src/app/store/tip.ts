import {action, computed, observable} from 'mobx';
import {OptionsObject} from 'notistack';

const MAX_EXIST_DURATION = 5 * 1000;

type TipQueueItem = 'default' | 'error' | 'success' | 'warning' | 'info';
type TipQueueEmitter = (
  message: React.ReactNode,
  options?: OptionsObject | undefined,
) => string | number | null | undefined;

export class TipStore {
  private _tipQueueEmitter: TipQueueEmitter | undefined;

  @observable
  private _isShowTip = false;

  private deferId: NodeJS.Timeout | undefined;

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

  @action
  destroy(): void {
    this._isShowTip = false;
  }

  @computed
  get isShowTip(): boolean {
    return this._isShowTip;
  }

  set tipQueue(emitter: TipQueueEmitter) {
    this._tipQueueEmitter = emitter;
  }

  addTipToQueue(msg: string, variant?: TipQueueItem): void {
    if (this._tipQueueEmitter) {
      this._tipQueueEmitter(msg, {variant});
    }
  }
}
