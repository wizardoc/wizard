import {MuiThemeProvider} from '@material-ui/core';
import React, {Component} from 'react';

import {HeaderBar} from './components';
import {BrowserRoutes} from './routes';
import {GlobalStyle, theme} from './theme';

export class App extends Component {
  render(): React.ReactNode {
    return (
      <MuiThemeProvider theme={theme}>
        <GlobalStyle />
        <HeaderBar />
        <BrowserRoutes />
      </MuiThemeProvider>
    );
  }
}
