import {MuiThemeProvider} from '@material-ui/core/styles';
import {observer} from 'mobx-react';
import {SnackbarProvider, WithSnackbarProps, withSnackbar} from 'notistack';
import React, {Component, FunctionComponent} from 'react';
import {BrowserRouter} from 'react-router-dom';
import styled from 'styled-components';

import {
  Dialogs,
  DocRecentUpdateDrawer,
  FloatingPop,
  Footer,
  HeaderBar,
} from './components';
import {AppRoutes} from './routes';
import {TipStore} from './store';
import {GlobalStyle, ThemeProvider, styledTheme, theme} from './theme';
import {InjectStore} from './utils';

const MAX_SNACK_BAR_COUNT = 5;

const Wrapper = styled.div`
  min-height: 100%;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 60px;
`;

@observer
class TApp extends Component<WithSnackbarProps> {
  @InjectStore(TipStore)
  tipStore!: TipStore;

  render(): React.ReactNode {
    return (
      <ThemeProvider theme={styledTheme}>
        <MuiThemeProvider theme={theme}>
          <DocRecentUpdateDrawer />
          <GlobalStyle />
          <BrowserRouter>
            <Wrapper>
              <HeaderBar />
              <FloatingPop />
              <Dialogs />
              <AppRoutes />
              <Footer />
            </Wrapper>
          </BrowserRouter>
        </MuiThemeProvider>
      </ThemeProvider>
    );
  }

  componentDidMount(): void {
    const {enqueueSnackbar} = this.props;

    this.tipStore.tipQueue = enqueueSnackbar;
  }
}

const MyApp = withSnackbar(TApp);

export const App: FunctionComponent = () => (
  <SnackbarProvider maxSnack={MAX_SNACK_BAR_COUNT}>
    <MyApp />
  </SnackbarProvider>
);
