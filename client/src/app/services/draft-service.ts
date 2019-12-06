import {Injectable} from 'react-ts-di';
import {observable, action, computed} from 'mobx';

type StyleHandler = (style: string) => void;

export namespace DraftEvent {
  export const CurrentStyle = Symbol('currentStyle');
}

@Injectable()
export class DraftService {
  @observable
  private _currentStyle: string | undefined;

  // each event can have only listener
  private listeners = new Map<Symbol, StyleHandler>();

  @action
  setCurrentStyle(style: string): void {
    this._currentStyle = style;

    const handler = this.listeners.get(DraftEvent.CurrentStyle);

    if (handler) {
      handler(this._currentStyle);
    }
  }

  @computed
  get currentStyle(): string | undefined {
    return this._currentStyle;
  }

  get handlers(): IterableIterator<StyleHandler> {
    return this.listeners.values();
  }

  on(event: Symbol, cb: StyleHandler): void {
    this.listeners.set(event, cb);
  }
}
