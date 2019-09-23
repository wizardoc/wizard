import React, {FunctionComponent} from 'react';
import {Route} from 'react-router-dom';

import {Home} from './components/home';
import {Profile} from './components/profile';

export const Routes: FunctionComponent = () => (
  <div>
    <Route exact path="/" component={Home}></Route>
    <Route exact path="/profile" component={Profile}></Route>
  </div>
);
