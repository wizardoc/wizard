import {Injectable, Inject} from '@wizardoc/injector';

import {TipService} from './tip-service';

@Injectable()
export class Toast {
  @Inject
  private tipService!: TipService;

  success(text: string): void {
    this.tipService.addTipToQueue(text, 'success');
  }

  error(text: string): void {
    this.tipService.addTipToQueue(text, 'error');
  }

  warning(text: string): void {
    this.tipService.addTipToQueue(text, 'warning');
  }

  info(text: string): void {
    this.tipService.addTipToQueue(text, 'info');
  }
}
