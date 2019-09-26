import {MuiThemeProvider} from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import {observer} from 'mobx-react';
import {SnackbarProvider, WithSnackbarProps, withSnackbar} from 'notistack';
import React, {Component, FunctionComponent} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {
  CommonDialog,
  FloatingPop,
  Footer,
  HeaderBar,
  OptionalTip,
  Profile,
  SharePop,
} from './components';
import {AccessRoute, AppRoutes} from './routes';
import {DialogService, DrawerService, OptionalTipService} from './services';
import {TipStore} from './store';
import {GlobalStyle, ThemeProvider, styledTheme, theme} from './theme';
import {Drawer} from './ui';
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

  @Inject
  optionalTipService!: OptionalTipService;

  @Inject
  drawerService!: DrawerService;

  render(): React.ReactNode {
    const {options, isShow, currentDrawer} = this.drawerService;

    let dialogs: string[] = [];

    for (const dialogID of this.dialogService.dialogs.keys()) {
      dialogs.push(dialogID);
    }

    return (
      <ThemeProvider theme={styledTheme}>
        <MuiThemeProvider theme={theme}>
          {/* Drawer is render by service here */}
          {currentDrawer && (
            <Drawer {...options} open={isShow}>
              {currentDrawer}
            </Drawer>
          )}
          {/* Dialog is render by service here */}
          {dialogs.map(dialogID => (
            <CommonDialog key={dialogID} dialogID={dialogID}></CommonDialog>
          ))}
          <GlobalStyle />
          <BrowserRouter>
            {this.optionalTipService.tipInfos.map(info => (
              <OptionalTip key={info.name} {...info}></OptionalTip>
            ))}
            <Profile />
            <Wrapper>
              <HeaderBar />
              <AppRoutes />
              <AccessRoute />
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

    this.optionalTipService.push({
      name: '验证邮箱',
      description: '验证邮箱后，wizard 会把每次的更改推送发送到你邮箱哦',
      route: '/email-validator',
      icon: <EmailIcon></EmailIcon>,
    });
  }
}

const MyApp = withSnackbar(TApp);

export const App: FunctionComponent = () => (
  <SnackbarProvider maxSnack={MAX_SNACK_BAR_COUNT}>
    <MyApp />
  </SnackbarProvider>
);
