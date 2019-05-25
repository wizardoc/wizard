import {
  AppBar,
  Badge,
  IconButton,
  InputBase,
  SvgIcon,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/core';
import {StyleRules} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';
import EditIcon from '@material-ui/icons/Edit';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {GitHubSvg} from '../assets';
import Wizard from '../assets/static/wizard.png';
import {Links} from '../constant';
import {RecentDrawer} from '../store';
import {InjectStore} from '../utils';

import {HeaderBarTabs} from './header-bar-tabs';

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

export interface HeaderBarProps extends WithStyles<typeof styles> {}

const Logo = styled.img`
  height: 32px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

@observer
class THeaderBar extends Component<HeaderBarProps> {
  @InjectStore(RecentDrawer)
  private recentDrawer!: RecentDrawer;

  handleGithubIconClick(): void {
    window.open(Links.GitHub);
  }

  handleLogoClick(): void {
    this.recentDrawer.viewRecentDrawerToggle();

    console.info(this.recentDrawer.isViewRecentDrawer);
  }

  render(): ReactNode {
    const {classes} = this.props;
    const {
      grow,
      search,
      searchIcon,
      inputRoot,
      inputInput,
      notification,
    } = classes;

    return (
      <AppBar position="static">
        <Toolbar variant="dense">
          <Row>
            <IconButton onClick={() => this.handleLogoClick()}>
              <Logo src={Wizard} />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Wizard
            </Typography>
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
          <Tooltip title="notify">
            <IconButton color="inherit" className={notification}>
              <Badge>
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="edit doc">
            <IconButton color="inherit">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Github repository">
            <IconButton
              color="inherit"
              onClick={() => this.handleGithubIconClick()}
            >
              <SvgIcon>
                <GitHubSvg />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    );
  }
}

export const HeaderBar = withStyles(styles)(THeaderBar);
