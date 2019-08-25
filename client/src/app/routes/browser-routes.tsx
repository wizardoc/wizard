import React, {FunctionComponent} from 'react';

import {AccessRoute} from './access-route';
import {AppRoutes} from './app-route';

export const BrowserRoutes: FunctionComponent = () => (
  <>
    <AppRoutes />
    <AccessRoute />
  </>
);
