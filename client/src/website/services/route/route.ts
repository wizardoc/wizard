import {ComponentType} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import {
  ActivatedGuardConstructor,
  DeactivatedGuardConstructor,
  OriginDeactivatedGuardConstructor,
  OriginActivatedGuardConstructor,
} from './guards';

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
  activatedGuard?: (
    | ActivatedGuardConstructor
    | OriginActivatedGuardConstructor
  )[];
  deactivatedGuard?: (
    | DeactivatedGuardConstructor
    | OriginDeactivatedGuardConstructor
  )[];
  children?: Routes;
}

export interface ParsedRoute extends Route {
  layout: Layout;
}

export interface OriginGuard<
  T extends ActivatedGuardConstructor | DeactivatedGuardConstructor
> {
  isOrigin: boolean;
  guard: T;
}
