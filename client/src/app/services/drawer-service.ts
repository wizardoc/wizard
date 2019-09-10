import {DrawerProps} from '@material-ui/core/Drawer';
import {action, computed, observable} from 'mobx';
import {ReactNode} from 'react';
import {Injectable} from 'react-ts-di';

interface Direction {
  direction: DrawerProps['anchor'];
}

/** Drawer component using */
export interface ParsedDrawerOptions extends Direction {
  onOpen(): void;
  onClose(): void;
}

/** Invoke using */
type DrawerOptions = Partial<ParsedDrawerOptions> & Direction;

/**
 * Make a common display control logic for all drawer
 */
@Injectable()
export class DrawerService {
  @observable
  _isShow: boolean = false;

  currentDrawer: ReactNode | undefined;

  @observable
  _options: DrawerOptions = {direction: 'right'};

  /** Drawer to be render */
  @action
  render(drawer: ReactNode, options: DrawerOptions): void {
    const {onClose = (): void => {}, onOpen = (): void => {}} = options;
    const parsedOptions: DrawerOptions = {
      ...options,
      onClose: () => {
        onClose();
        this.toggleIsShow();
        this.hidden();
      },
      onOpen: () => {
        onOpen();
        this.toggleIsShow();
      },
    };

    this.currentDrawer = drawer;
    this._options = parsedOptions;
    this.show();
  }

  @action
  hidden(): void {
    this._isShow = false;
    this.resetConfig();
  }

  @action
  show(): void {
    this._isShow = true;
  }

  @action
  private toggleIsShow(): void {
    this._isShow = !this._isShow;
  }

  @computed
  get isShow(): boolean {
    return this._isShow;
  }

  @computed
  get options(): ParsedDrawerOptions {
    return this._options as ParsedDrawerOptions;
  }

  @action
  private resetConfig(): void {
    this._isShow = false;
    this._options = {direction: 'right'};
    this.currentDrawer = undefined;
  }
}
