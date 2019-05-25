import {MuiThemeProvider} from '@material-ui/core/styles';
import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import {
  Dialogs,
  DocRecentUpdateDrawer,
  FloatingPop,
  Footer,
  HeaderBar,
} from './components';
import {AppRoutes} from './routes';
import {GlobalStyle, ThemeProvider, styledTheme, theme} from './theme';

export class App extends Component {
  render(): React.ReactNode {
    return (
      <ThemeProvider theme={styledTheme}>
        <MuiThemeProvider theme={theme}>
          <DocRecentUpdateDrawer />
          <GlobalStyle />
          <BrowserRouter>
            <HeaderBar />
            <FloatingPop />
            <Dialogs />
            <AppRoutes />
            <Footer />
          </BrowserRouter>
        </MuiThemeProvider>
      </ThemeProvider>
    );
  }
}
