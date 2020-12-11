import {Injectable, Inject} from '@wizardoc/injector';

import {TipService} from './tip-service';

@Injectable()
export class Toast {
  @Inject
  private tipService!: TipService;

  success(text: string): void {
    this.tipService.showSnackBar(text, 'success');
  }

  error(text: string): void {
    this.tipService.showSnackBar(text, 'error');
  }

  warning(text: string): void {
    this.tipService.showSnackBar(text, 'warning');
  }

  info(text: string): void {
    this.tipService.showSnackBar(text, 'info');
  }
}
