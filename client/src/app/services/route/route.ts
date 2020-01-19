import {ComponentType} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import {ActivatedGuardConstructor, DeactivatedGuardConstructor} from './guards';

export type Routes = Route[];

export type Layout = 'limpidity' | 'normal';

export interface Route {
  path: string;
  exact?: boolean;
  redirect?: string;
  layout?: Layout;
  /**
   * 当 Component 为空时，会自动填充 404
   */
  component?: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
  activatedGuard?: ActivatedGuardConstructor;
  deactivatedGuard?: DeactivatedGuardConstructor;
  children?: Routes;
}

export interface ParsedRoute extends Route {
  layout: Layout;
}
