import {
  AppBar,
  IconButton,
  InputBase,
  Theme,
  Toolbar,
  Typography,
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/core';
import {AppBarProps} from '@material-ui/core/AppBar';
import {StyleRules} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {TypographyProps} from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Inject} from 'react-ts-di';
// import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import Wizard from '../../assets/static/wizard-white.jpg';
import {DrawerService} from '../../services';
import {UIControl} from '../../store';
import {InjectStore} from '../../utils';
import {DocRecentUpdateDrawer} from '../doc-recent-update-drawer';

import {Funcs} from './@funcs';
import {HeaderBarTabs} from './header-bar-tabs';

interface AppBarWrapperProps {
  isMainPage: boolean;
}

const styles = (theme: Theme): StyleRules =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(9),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(9),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
    grow: {
      flexGrow: 1,
    },
    notification: {
      marginLeft: theme.spacing(1),
    },
  });

type HOCProps = WithStyles<typeof styles> & RouteComponentProps;

export interface HeaderBarProps extends HOCProps {}

const Logo = styled.img`
  height: 22px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WizardTitle = styled(Typography)`
  cursor: pointer;
` as ComponentType<TypographyProps>;

const AppBarWrapper = styled(AppBar)<AppBarWrapperProps>`
  ${props => !props.isMainPage && 'top: 0;position: sticky !important;'}
` as ComponentType<AppBarProps & AppBarWrapperProps>;

@observer
class THeaderBar extends Component<HeaderBarProps> {
  @InjectStore(UIControl)
  private uiControl!: UIControl;

  @Inject
  private drawerService!: DrawerService;

  handleLogoClick(): void {
    this.drawerService.render(<DocRecentUpdateDrawer></DocRecentUpdateDrawer>, {
      anchor: 'left',
    });
  }

  handleWizardTitleClick(): void {
    const {history} = this.props;

    history.push('/');
  }

  render(): ReactNode {
    const {classes} = this.props;
    const {grow, search, searchIcon, inputRoot, inputInput} = classes;

    return (
      <AppBarWrapper position="static" isMainPage={this.uiControl.isMainPage}>
        <Toolbar variant="dense">
          <Row>
            <IconButton onClick={() => this.handleLogoClick()}>
              <Logo src={Wizard} />
            </IconButton>
            <WizardTitle
              variant="h6"
              color="inherit"
              onClick={() => this.handleWizardTitleClick()}
            >
              Wizard
            </WizardTitle>
          </Row>
          <HeaderBarTabs />
          <div className={grow} />
          <div className={search}>
            <div className={searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="查询相关文档"
              classes={{
                root: inputRoot,
                input: inputInput,
              }}
            />
          </div>
          <Funcs></Funcs>
        </Toolbar>
      </AppBarWrapper>
    );
  }
}

export const HeaderBar = withStyles(styles)(withRouter(THeaderBar));
