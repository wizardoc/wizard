import {Omit} from 'website/types/type-utils';
import * as AppRoutes from 'website/routes';

import {Route, Routes, ParsedRoute, OriginGuard} from './route';
import {
  ActivatedGuardConstructor,
  DeactivatedGuardConstructor,
  OriginActivatedGuardConstructor,
  OriginDeactivatedGuardConstructor,
} from './guards';

const STUB_ROUTE: Route = {path: ''};

export class RouterService {
  private readonly defaultRoutes: Omit<Route, 'path'> = {
    exact: true,
  };
  private parsedRoutes: ParsedRoute[];

  constructor() {
    this.parsedRoutes = this.preparseRoutes(this.loadRoutes(), STUB_ROUTE);
  }

  /**
   * 加载从 /src/website/routes 里注册的 route
   */
  loadRoutes(): Routes {
    return Object.keys(AppRoutes)
      .map(key => AppRoutes[key])
      .flat();
  }

  /**
   * 预解析 Routes，将 routes 摊平，补全默认值
   * @param routes 需要解析的 routes 数据
   * @param parent 父级的 route 数据
   */
  preparseRoutes(routes: Routes, {path, layout}: Route): ParsedRoute[] {
    const parentRoutes = routes.map(route => ({
      ...this.defaultRoutes,
      ...route,
      path: path + route.path,
      layout: route.layout || layout || 'normal',
    }));

    return parentRoutes.concat(
      parentRoutes
        .map(route =>
          this.preparseRoutes(
            // attach children
            (route.children ?? []).map(child => ({
              father: route.component,
              ...child,
              ...(child.isNest
                ? {
                    isFullContainer: route.isFullContainer,
                    headerType: route.headerType,
                    layout: route.layout,
                  }
                : {}),
              activatedGuard: this.composeGuards(
                'activatedGuard',
                route,
                child,
              ) as OriginActivatedGuardConstructor[],
              deactivatedGuard: this.composeGuards(
                'deactivatedGuard',
                route,
                child,
              ) as OriginDeactivatedGuardConstructor[],
            })),
            route,
          ),
        )
        .flat(),
    );
  }

  private composeGuards(
    type: string,
    parent: Route,
    child: Route,
  ): OriginGuard<ActivatedGuardConstructor | DeactivatedGuardConstructor>[] {
    return [
      ...this.attachTag(parent[type], 'father'),
      ...this.attachTag(child[type], 'origin'),
    ];
  }

  private attachTag<
    T extends ActivatedGuardConstructor | DeactivatedGuardConstructor
  >(target: T[], tag: 'origin' | 'father'): OriginGuard<T>[] {
    return (target ?? []).map(guard => ({isOrigin: tag === 'origin', guard}));
  }

  get routes(): ParsedRoute[] {
    return this.parsedRoutes;
  }
}
