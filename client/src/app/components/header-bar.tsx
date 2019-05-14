import {
  AppBar,
  Badge,
  IconButton,
  InputBase,
  SvgIcon,
  Theme,
  Toolbar,
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
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {GitHubSvg} from '../assets';
import Wizard from '../assets/static/wizard.png';
import {Links} from '../constant';

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
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
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
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
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
    notifaction: {
      marginLeft: theme.spacing.unit,
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

export const HeaderBar = withStyles(styles)(
  class extends Component<HeaderBarProps> {
    handleGithubIconClick() {
      window.open(Links.GitHub);
    }

    render(): ReactNode {
      const {classes} = this.props;
      const {
        grow,
        search,
        searchIcon,
        inputRoot,
        inputInput,
        notifaction,
      } = classes;

      return (
        <AppBar position="static">
          <Toolbar variant="dense">
            <Row>
              <IconButton>
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
            <IconButton color="inherit" className={notifaction}>
              <Badge>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <EditIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => this.handleGithubIconClick()}
            >
              <SvgIcon>
                <GitHubSvg />
              </SvgIcon>
            </IconButton>
          </Toolbar>
        </AppBar>
      );
    }
  },
);
