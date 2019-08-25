import React, {Component, ReactNode} from 'react';
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {LoginPage} from '../pages/login-page';
import {RegisterPage} from '../pages/register-page';

export class TAccessRoute extends Component<RouteComponentProps> {
  render(): ReactNode {
    return (
      <Switch>
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    );
  }
}

export const AccessRoute = withRouter(TAccessRoute);
