import React, {Component, ReactNode, Suspense, ComponentType} from 'react';
import {Inject} from '@wizardoc/injector';
import {Switch, Route, Redirect, RouteComponentProps} from 'react-router-dom';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {isString} from '@wizardoc/shared';

import {
  Route as AppRoute,
  OriginActivatedGuardConstructor,
} from 'src/app/services';

import {RouterService, Layout, TabService} from './services';
import {PageNotFound} from './pages/page-not-found';
import {Footer, HeaderBar} from './components';

interface WrapperProps {
  isHideFooter: boolean;
  isHideHeader: boolean;
  isFull?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  /* height: ${props =>
    props.isFull ? props.theme.heightOmitHeader : 'fit-content'}; */
  min-height: ${props =>
    props.isHideHeader ? '100%' : props.theme.heightOmitHeader};
  position: relative;
  ${props => !props.isHideFooter && 'padding-bottom: 360px;'}
`;

export const guardWrapper = (
  Wrapper: ComponentType,
  route: AppRoute,
  props: RouteComponentProps,
): ComponentType => {
  @observer
  class GuardWrapper extends Component {
    @observable
    targetView: ReactNode = (<div>123</div>);

    render(): ReactNode {
      return this.targetView;
    }

    async componentDidMount(): Promise<void> {
      const [ok, stuff] = await this.processActiveGuard(route, props);

      if (!ok) {
        this.targetView = stuff;

        return;
      }

      this.targetView = (
        <Wrapper {...this.props} {...(stuff as object)}></Wrapper>
      );
    }

    private async processActiveGuard(
      route: AppRoute,
      props: RouteComponentProps,
    ): Promise<[boolean, ReactNode | object]> {
      let injectProps = {};

      for (const ActiveGuard of route.activatedGuard ?? []) {
        const {
          isOrigin,
          guard: Guard,
        } = ActiveGuard as OriginActivatedGuardConstructor;
        const activatedGuard = new Guard();
        let eachInjectProps = {};
        const injector = (props?: object): void => {
          eachInjectProps = props ?? {};
        };
        const canActive = await activatedGuard.canActivated(
          route,
          props,
          injector,
        );

        // compose props
        if (isOrigin) {
          injectProps = {...injectProps, ...eachInjectProps};
        }

        if (isString(canActive)) {
          return [false, <Redirect to={canActive} />];
        }

        if (!canActive) {
          return [false, <PageNotFound />];
        }
      }

      return [true, injectProps];
    }
  }

  return GuardWrapper;
};

/**
 * 整个 App 的 Route 渲染组件，通过解析 routerService 的 routes 渲染和处理所有的 routes
 * 渲染 && 处理子路由 -> 处理额外参数
 * @author Younccat
 */
export class AppRouting extends Component {
  @Inject
  routerService!: RouterService;

  @Inject
  tabService!: TabService;

  render(): ReactNode {
    const routeComponents = this.renderComponents();

    return (
      <Suspense fallback="正在加载中...">
        <Switch>
          {routeComponents}
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    );
  }

  private renderComponents(): ReactNode {
    return this.routerService.routes.map(route => (
      <Route
        key={route.path}
        path={route.path}
        exact={route.exact}
        render={(props: RouteComponentProps): ReactNode =>
          this.renderProcessor(route, props)
        }
      />
    ));
  }

  private renderProcessor(
    route: AppRoute,
    props: RouteComponentProps,
  ): ReactNode {
    const {
      redirect,
      component,
      headerType = 'fixed',
      father,
      isNest,
      isFullContainer,
      layout = 'normal',
    } = route;

    if (redirect) {
      return this.redirect(redirect);
    }

    // process render
    if (component) {
      type RenderComponent = {
        [k in Layout]: ReactNode;
      };

      const Father = father as ComponentType;
      guardWrapper(component as ComponentType, route, props);
      const Component = guardWrapper(component as ComponentType, route, props);
      const renderComponent = isNest ? (
        <Father>
          <Component />
        </Father>
      ) : (
        <Component />
      );
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
        limpidity: renderComponent,
        normal: (
          <>
            {header}
            {wrapper(
              <>
                {renderComponent}
                <Footer />
              </>,
            )}
          </>
        ),
        'no-header': wrapper(
          <>
            {renderComponent}
            <Footer />
          </>,
        ),
        'no-footer': (
          <>
            {header}
            {wrapper(renderComponent)}
          </>
        ),
      };

      return RENDER_COMPONENT[layout];
    }

    if (!component && !redirect) {
      return <PageNotFound />;
    }

    throw new Error('Make sure the component field exists');
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
