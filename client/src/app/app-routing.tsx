import React, {Component, ReactNode, Suspense, ComponentType} from 'react';
import {Inject} from 'react-ts-di';
import {Switch, Route, Redirect, RouteComponentProps} from 'react-router-dom';
import styled from 'styled-components';

import {RouterService} from './services';
import {PageNotFound} from './pages/page-not-found';
import {isString} from './utils';
import {FloatingPop, Footer, SharePop} from './components';

const Wrapper = styled.div`
  min-height: 100%;
  position: relative;
  padding-bottom: 360px;
`;

/**
 * 整个 App 的 Route 渲染组件，通过解析 routerService 的 routes 渲染和处理所有的 routes
 * @author Younccat
 */
export class AppRouting extends Component {
  @Inject
  routerService!: RouterService;

  render(): ReactNode {
    const routeComponents = this.routerService.routes.map(route => (
      <Route
        path={route.path}
        exact={route.exact}
        render={(props: RouteComponentProps<any>) => {
          // process activated guard
          if (route.activatedGuard) {
            const activatedGuard = new route.activatedGuard();
            const canActive = activatedGuard.canActivated(route, props);

            if (isString(canActive)) {
              return this.redirect(canActive);
            }

            if (!canActive) {
              return <PageNotFound />;
            }
          }

          return this.renderProcessor(
            route.layout,
            route.redirect,
            route.component,
          );
        }}
      />
    ));

    return (
      <Suspense fallback="正在加载中...">
        <Switch>
          {routeComponents}
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    );
  }

  private renderProcessor(
    layout: 'limpidity' | 'normal' | undefined,
    redirect?: string,
    component?: ComponentType<RouteComponentProps<any>> | ComponentType<any>,
  ): ReactNode {
    const RenderComponent = component as ComponentType<unknown>;

    // process render
    if (component) {
      return layout === 'limpidity' ? (
        <RenderComponent />
      ) : (
        <Wrapper>
          <RenderComponent />
          <FloatingPop />
          <SharePop />
          <Footer />
        </Wrapper>
      );

      return <RenderComponent></RenderComponent>;
    }

    if (!component && !redirect) {
      return <PageNotFound />;
    }

    return this.redirect(redirect!);
  }

  private redirect(path: string): ReactNode {
    return <Redirect to={path} />;
  }
}
