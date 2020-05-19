import {DrawerProps} from '@material-ui/core/Drawer';
import {action, computed, observable} from 'mobx';
import {ReactNode} from 'react';
import {Inject, Injectable} from '@wizardoc/injector';

import {Time} from './time';

interface Direction {
  anchor: DrawerProps['anchor'];
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
  _options: DrawerOptions = {anchor: 'right'};

  @Inject
  time!: Time;

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

    /** some config need reset while animation ending */
  }
}
