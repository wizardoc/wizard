import React, {Component, ReactNode, Suspense, ComponentType} from 'react';
import {Inject} from 'react-ts-di';
import {Switch, Route, Redirect, RouteComponentProps} from 'react-router-dom';
import styled from 'styled-components';

import {RouterService, Layout, TabService, HeaderType} from './services';
import {PageNotFound} from './pages/page-not-found';
import {isString} from './utils';
import {Footer, SharePop, HeaderBar} from './components';

interface WrapperProps {
  isHideFooter: boolean;
  isHideHeader: boolean;
  isFull?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  height: ${props =>
    props.isFull ? props.theme.heightOmitHeader : 'fit-content'};
  min-height: ${props =>
    props.isHideHeader ? '100%' : props.theme.heightOmitHeader};
  position: relative;
  ${props => !props.isHideFooter && 'padding-bottom: 360px;'}
`;

/**
 * 整个 App 的 Route 渲染组件，通过解析 routerService 的 routes 渲染和处理所有的 routes
 * @author Younccat
 */
export class AppRouting extends Component {
  @Inject
  routerService!: RouterService;

  @Inject
  tabService!: TabService;

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
            route.headerType,
            route.isFullContainer,
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
    layout: Layout,
    redirect?: string,
    component?: ComponentType<RouteComponentProps<any>> | ComponentType<any>,
    headerType: HeaderType = 'fixed',
    isFullContainer?: boolean,
  ): ReactNode {
    const RenderComponent = component as ComponentType<unknown>;

    // process render
    if (component) {
      type RenderComponent = {
        [k in Layout]: ReactNode;
      };

      const header = <HeaderBar isFixed={headerType === 'fixed'} />;
      const wrapper = (children: ReactNode): ReactNode => (
        <Wrapper
          isHideFooter={layout === 'no-footer'}
          isHideHeader={layout === 'no-header'}
          isFull={isFullContainer ?? true}
        >
          {children}
        </Wrapper>
      );

      const RENDER_COMPONENT: RenderComponent = {
        limpidity: <RenderComponent />,
        normal: (
          <>
            {header}
            {wrapper(
              <>
                <RenderComponent />
                {/* <FloatingPop /> */}
                <SharePop />
                <Footer />
              </>,
            )}
          </>
        ),
        'no-header': wrapper(
          <>
            <RenderComponent />
            {/* <FloatingPop /> */}
            <SharePop />
            <Footer />
          </>,
        ),
        'no-footer': (
          <>
            {header}
            {wrapper(
              <>
                <RenderComponent />
                {/* <FloatingPop /> */}
                <SharePop />
              </>,
            )}
          </>
        ),
      };

      return RENDER_COMPONENT[layout];
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

// function fixedHeader<P extends object>(
//   Wrapper: ComponentType<P>,
//   isFixedHeaderBar: boolean,
// ): any {
//   class FixedHeaderHOC extends Component<P> {
//     @Inject
//     tabService!: TabService;

//     constructor(props: P) {
//       super(props);

//       console.info(isFixedHeaderBar);
//       setTimeout(() => (this.tabService.isMainPage = !isFixedHeaderBar), 1000);
//     }

//     render(): ReactNode {
//       return <Wrapper {...this.props} />;
//     }

//     componentDidMount(): void {}
//   }

//   return FixedHeaderHOC;
// }
