import {MuiThemeProvider} from '@material-ui/core';
import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import {HeaderBar} from './components';
import {BrowserRoutes} from './routes';
import {GlobalStyle, theme} from './theme';

export class App extends Component {
  render(): React.ReactNode {
    return (
      <MuiThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <HeaderBar />

          <BrowserRoutes />
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
