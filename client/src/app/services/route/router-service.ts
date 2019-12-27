import {Omit} from 'src/app/types/type-utils';

import {AppRoutes1, Route, Routes} from './routes';

export class RouterService {
  private readonly _routes: Routes = AppRoutes1;
  private readonly defaultRoutes: Omit<Route, 'path'> = {
    exact: true,
  };

  private preparseRoutes(routes: Routes, prefixPath: string): Routes {
    return routes
      .map(route => ({
        ...this.defaultRoutes,
        ...route,
        path: prefixPath + route.path,
      }))
      .concat(
        ...routes.map(route =>
          this.preparseRoutes(route.children || [], route.path),
        ),
      );
  }

  get routes(): Routes {
    return this.preparseRoutes(this._routes, '');
  }
}
