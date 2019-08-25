import {MuiThemeProvider} from '@material-ui/core/styles';
import {observer} from 'mobx-react';
import {SnackbarProvider, WithSnackbarProps, withSnackbar} from 'notistack';
import React, {Component, FunctionComponent} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {
  CommonDialog,
  DocRecentUpdateDrawer,
  FloatingPop,
  Footer,
  HeaderBar,
  Profile,
  SharePop,
} from './components';
import {BrowserRoutes} from './routes';
import {DialogService} from './services';
import {TipStore} from './store';
import {GlobalStyle, ThemeProvider, styledTheme, theme} from './theme';
// import {GhostPage} from './ui';
import {InjectStore} from './utils';

const MAX_SNACK_BAR_COUNT = 3;

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

  @Inject
  dialogService!: DialogService;

  render(): React.ReactNode {
    let dialogs: string[] = [];

    for (const dialogID of this.dialogService.dialogs.keys()) {
      dialogs.push(dialogID);
    }

    return (
      <ThemeProvider theme={styledTheme}>
        <MuiThemeProvider theme={theme}>
          <DocRecentUpdateDrawer />
          {dialogs.map(dialogID => (
            <CommonDialog key={dialogID} dialogID={dialogID}></CommonDialog>
          ))}
          <GlobalStyle />
          {/* <GhostPage /> */}
          <BrowserRouter>
            <Profile />
            <Wrapper>
              <HeaderBar />
              <BrowserRoutes />
              <FloatingPop />
              <SharePop />
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
