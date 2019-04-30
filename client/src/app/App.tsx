import {MuiThemeProvider} from '@material-ui/core';
import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import {AppRoutes} from './routes';
import {theme} from './theme';

export class App extends Component {
  render(): React.ReactNode {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
