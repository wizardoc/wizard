import React, {Component, ReactNode} from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';

import {About} from '../pages/about';
import {Doc} from '../pages/doc';
import {Home} from '../pages/home';
import {LoginPage} from '../pages/login-page';
import {PageNotFound} from '../pages/page-not-found';
import {RegisterPage} from '../pages/register-page';
import {UIControl} from '../store';
import {InjectStore} from '../utils';

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
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/doc" component={Doc} />
        <Route exact path="/about" component={About} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />?
        <Route component={PageNotFound} />
      </Switch>
    );
  }

  componentDidMount(): void {
    const {history} = this.props;

    this.unListen = history.listen(loc => {
      const {pathname} = loc;

      if (['/home', '/'].includes(pathname)) {
        this.uiControl.isMainPage = true;
      } else {
        this.uiControl.isMainPage = false;
      }
    });
  }

  componentWillUnmount(): void {
    if (!this.unListen) {
      return;
    }

    this.unListen();
  }
}

export const AppRoutes = withRouter(TAppRoutes);
