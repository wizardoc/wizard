import {Injectable} from 'react-ts-di';

import {TipStore} from '../store';
import {InjectStore} from '../utils';

@Injectable()
export class Toast {
  @InjectStore(TipStore)
  private tipStore!: TipStore;

  success(text: string): void {
    this.tipStore.addTipToQueue(text, 'success');
  }

  error(text: string): void {
    this.tipStore.addTipToQueue(text, 'error');
  }

  warning(text: string): void {
    this.tipStore.addTipToQueue(text, 'warning');
  }

  info(text: string): void {
    this.tipStore.addTipToQueue(text, 'info');
  }
}
