import React, {FunctionComponent, ReactElement} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import {About} from '../pages/about';
import {Doc} from '../pages/doc';
import {Home} from '../pages/home';
import {PageNotFound} from '../pages/page-not-found';

interface AppRoutesProps {
  initData?: unknown;
}

export const AppRoutes: FunctionComponent<AppRoutesProps> = (
  _initData?: unknown,
): ReactElement => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/doc" component={Doc} />
    <Route exact path="/about" component={About} />
    <Route component={PageNotFound} />
  </Switch>
);
