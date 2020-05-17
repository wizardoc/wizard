import {MuiThemeProvider} from '@material-ui/core/styles';
// import EmailIcon from '@material-ui/icons/Email';
import {observer} from 'mobx-react';
import {SnackbarProvider, WithSnackbarProps, withSnackbar} from 'notistack';
import React, {Component, FunctionComponent, ReactNode} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Inject} from 'react-ts-di';

import {CommonDialog, OptionalTip, Profile, Default} from './components';
import {DrawerService, DialogPool, OptionalTipService} from './services';
import {TipStore} from './store';
import {GlobalStyle, ThemeProvider, styledTheme, theme} from './theme';
import {Drawer} from './ui';
import {InjectStore} from './utils';
import {AppRouting} from './app-routing';

const MAX_SNACK_BAR_COUNT = 3;

@observer
class DialogEntry extends Component {
  @Inject
  dialogPool!: DialogPool;

  render(): ReactNode {
    return Array.from(this.dialogPool.dialogs.keys()).map(dialogID => (
      <CommonDialog key={dialogID} dialogID={dialogID}></CommonDialog>
    ));
  }
}

@observer
class OptionalTipEntry extends Component {
  @Inject
  optionalTipService!: OptionalTipService;

  render(): ReactNode {
    return this.optionalTipService.tipInfos.map(info => (
      <OptionalTip key={info.name} {...info}></OptionalTip>
    ));
  }
}

@observer
class DrawerEntry extends Component {
  @Inject
  drawerService!: DrawerService;

  render(): ReactNode {
    const {options, isShow, currentDrawer} = this.drawerService;

    return (
      <Default condition={() => !currentDrawer}>
        <Drawer {...options} open={isShow}>
          {currentDrawer}
        </Drawer>
      </Default>
    );
  }
}

@observer
class TApp extends Component<WithSnackbarProps> {
  @InjectStore(TipStore)
  tipStore!: TipStore;

  render(): React.ReactNode {
    return (
      <ThemeProvider theme={styledTheme}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            {/* Drawer is render by service here */}
            <DrawerEntry />
            {/* Dialog is render by service here */}
            <DialogEntry />
            <GlobalStyle />
            <Profile />
            <OptionalTipEntry />
            {/* <HeaderBar /> */}
            <AppRouting />
          </MuiThemeProvider>
        </BrowserRouter>
      </ThemeProvider>
    );
  }

  componentDidMount(): void {
    const {enqueueSnackbar} = this.props;

    this.tipStore.tipQueue = enqueueSnackbar;

    // this.optionalTipService.push({
    //   name: '验证邮箱',
    //   description: '验证邮箱后，wizard 会把每次的更改推送发送到你邮箱哦',
    //   route: '/email-validator',
    //   icon: <EmailIcon></EmailIcon>,
    // });
  }
}

const MyApp = withSnackbar(TApp);

export const App: FunctionComponent = () => (
  <SnackbarProvider maxSnack={MAX_SNACK_BAR_COUNT}>
    <MyApp />
  </SnackbarProvider>
);
