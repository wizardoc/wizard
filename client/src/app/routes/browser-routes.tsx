import React, {FunctionComponent} from 'react';
import {BrowserRouter} from 'react-router-dom';

import {AppRoutes} from './app-route';

export const BrowserRoutes: FunctionComponent = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);
