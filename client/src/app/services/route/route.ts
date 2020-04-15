import {ComponentType} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import {ActivatedGuardConstructor, DeactivatedGuardConstructor} from './guards';

export type Routes = Route[];

export type Layout = 'limpidity' | 'normal' | 'no-header' | 'no-footer';

export type HeaderType = 'default' | 'fixed';

export type RouteComponent =
  | ComponentType<RouteComponentProps<any>>
  | ComponentType<any>;

export interface Route {
  path: string;
  exact?: boolean;
  redirect?: string;
  layout?: Layout;
  // header
  isFullContainer?: boolean;
  headerType?: HeaderType; // default: fixed
  father?: RouteComponent;
  // 嵌套到父级视图
  isNest?: boolean;
  /**
   * 当 Component 为空时，会自动填充 404
   */
  component?: RouteComponent;
  activatedGuard?: ActivatedGuardConstructor;
  deactivatedGuard?: DeactivatedGuardConstructor;
  children?: Routes;
}

export interface ParsedRoute extends Route {
  layout: Layout;
}
