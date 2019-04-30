import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import {AppRoutes} from './routes';

export class App extends Component {
  render(): React.ReactNode {
    return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
  }
}
