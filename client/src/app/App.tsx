import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import {Doc} from './pages/doc';
import {Home} from './pages/home';
import {PageNotFound} from './pages/page-not-found';

export class App extends Component {
  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/doc" component={Doc} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
