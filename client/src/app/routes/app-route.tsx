import 'animate.css';

import React, {Component, ReactNode, Suspense, lazy} from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
// import {CSSTransition, TransitionGroup} from 'react-transition-group';

// import {PageNotFound} from '../pages/page-not-found';
import {UIControl} from '../store';
import {InjectStore, defaultify} from '../utils';

import './tmp.css';

interface AppRoutesProps {
  initData?: unknown;
}

/** Lazy load */
const Home = lazy(() => defaultify(import('../pages/home'), 'Home'));
const Doc = lazy(() => defaultify(import('../pages/doc'), 'Doc'));
const Organization = lazy(() =>
  defaultify(import('../pages/organization'), 'Organization'),
);
const About = lazy(() => defaultify(import('../pages/about'), 'About'));

export class TAppRoutes extends Component<
  AppRoutesProps & RouteComponentProps
> {
  @InjectStore(UIControl)
  uiControl!: UIControl;

  private unListen: Function | undefined;

  render(): ReactNode {
    const {location} = this.props;

    return (
      // <TransitionGroup>
      //   <CSSTransition
      //     key={location.pathname}
      //     classNames={'fade'}
      //     timeout={500}
      //     mountOnEnter
      //     unmountOnExit
      //   >
      <Suspense fallback="正在加载中...">
        <Switch location={location}>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/doc" component={Doc} />
          <Route exact path="/about" component={About} />
          <Route exact path="/organization" component={Organization} />
          {/* <Route component={PageNotFound} /> */}
        </Switch>
      </Suspense>
      // </CSSTransition>
      // </TransitionGroup>
    );
  }

  componentDidMount(): void {
    const {history} = this.props;

    this.unListen = history.listen(({pathname}) =>
      this.uiControl.updatePage(pathname),
    );
  }

  componentWillUnmount(): void {
    if (!this.unListen) {
      return;
    }

    this.unListen();
  }
}

export const AppRoutes = withRouter(TAppRoutes);
