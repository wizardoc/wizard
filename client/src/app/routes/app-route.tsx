import 'animate.css';

import React, {Component, ReactNode} from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {About} from '../pages/about';
import {Doc} from '../pages/doc';
import {Home} from '../pages/home';
// import {PageNotFound} from '../pages/page-not-found';
import {UIControl} from '../store';
import {InjectStore} from '../utils';

import './tmp.css';

interface AppRoutesProps {
  initData?: unknown;
}

export class TAppRoutes extends Component<
  AppRoutesProps & RouteComponentProps
> {
  @InjectStore(UIControl)
  uiControl!: UIControl;

  private unListen: Function | undefined;

  render(): ReactNode {
    const {location} = this.props;

    return (
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames={'fade'}
          timeout={500}
          mountOnEnter
          unmountOnExit
        >
          <Switch location={location}>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/doc" component={Doc} />
            <Route exact path="/about" component={About} />
            {/* <Route component={PageNotFound} /> */}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
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
