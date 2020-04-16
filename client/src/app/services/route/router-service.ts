import {Omit} from 'src/app/types/type-utils';
import * as AppRoutes from 'src/app/routes';

import {Route, Routes, ParsedRoute} from './route';

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
   * 加载从 /src/app/routes 里注册的 route
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
            })),
            route,
          ),
        )
        .flat(),
    );
  }

  get routes(): ParsedRoute[] {
    return this.parsedRoutes;
  }
}
