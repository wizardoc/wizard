import {MuiThemeProvider} from '@material-ui/core';
import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import {FloatingPop, HeaderBar, Loading} from './components';
import {AppRoutes} from './routes';
import {GlobalStyle, ThemeProvider, styledTheme, theme} from './theme';

export class App extends Component {
  render(): React.ReactNode {
    return (
      <ThemeProvider theme={styledTheme}>
        <MuiThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
            <HeaderBar />
            <FloatingPop />
            <Loading />
            <AppRoutes />
          </BrowserRouter>
        </MuiThemeProvider>
      </ThemeProvider>
    );
  }
}
