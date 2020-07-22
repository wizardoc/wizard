import {Injectable} from '@wizardoc/injector';
import {observable} from 'mobx';

@Injectable()
export class BackdropService {
  @observable
  private _isViewBackdrop = false;

  get isViewBackdrop(): boolean {
    return this._isViewBackdrop;
  }

  show(): void {
    this._isViewBackdrop = true;
  }

  hide(): void {
    this._isViewBackdrop = false;
  }
}
