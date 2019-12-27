import {ComponentType} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import {ActivatedGuardConstructor, DeactivatedGuardConstructor} from './guards';
import {rootRoutes, limpidityRoutes} from './@routes';

export type Routes = Route[];

export interface Route {
  path: string;
  exact?: boolean;
  redirect?: string;
  layout?: 'no-header' | 'normal';
  /**
   * 当 Component 为空时，会自动填充 404
   */
  component?: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
  activatedGuard?: ActivatedGuardConstructor;
  deactivatedGuard?: DeactivatedGuardConstructor;
  children?: Routes;
}

export const AppRoutes1: Routes = [...rootRoutes, ...limpidityRoutes];
