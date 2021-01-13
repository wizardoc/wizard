import {action, computed, observable} from 'mobx';
import {OptionsObject} from 'notistack';
import {Injectable} from '@wizardoc/injector';
import UUID from 'uuid';

const MAX_EXIST_DURATION = 2 * 1000;

export type TipQueueItem = 'error' | 'success' | 'warning' | 'info' | undefined;
type TipQueueEmitter = (
  message: React.ReactNode,
  options?: OptionsObject | undefined,
) => string | number | null | undefined;

interface SnackBarData {
  id: string;
  message: string;
  variant: TipQueueItem;
}

@Injectable()
export class TipService {
  private _tipQueueEmitter: TipQueueEmitter | undefined;

  @observable
  private _isShowTip = false;

  @observable
  private _snackBars: SnackBarData[] = [];

  private deferId: NodeJS.Timeout | undefined;

  private waitRemoveSnackBarCounts = 0;

  @computed
  get snackBars(): SnackBarData[] {
    return this._snackBars;
  }

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

    this.deferId = setTimeout(() => (this._isShowTip = false), MAX_EXIST_DURATION);
  }

  @action
  destroy(): void {
    this._isShowTip = false;
  }

  @action
  removeSnackBar(_: string): void {
    if (this._snackBars.length === ++this.waitRemoveSnackBarCounts) {
      this.clearSnackBars();
    }
  }

  @computed
  get isShowTip(): boolean {
    return this._isShowTip;
  }

  set tipQueue(emitter: TipQueueEmitter) {
    this._tipQueueEmitter = emitter;
  }

  showSnackBar(message: string, variant?: TipQueueItem): void {
    this._snackBars.push({id: UUID.v4(), message, variant});
  }

  addTipToQueue(msg: string, variant?: TipQueueItem): void {
    if (this._tipQueueEmitter) {
      this._tipQueueEmitter(msg, {variant});
    }
  }

  private clearSnackBars(): void {
    this.waitRemoveSnackBarCounts = 0;
    this._snackBars = [];
  }
}
