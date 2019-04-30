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
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import React, {Component, ReactNode} from 'react';

import {Links} from '../constant';

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
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Wizard
            </Typography>
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
            <IconButton
              color="inherit"
              onClick={() => this.handleGithubIconClick()}
            >
              <SvgIcon>
                <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
              </SvgIcon>
            </IconButton>
          </Toolbar>
        </AppBar>
      );
    }
  },
);
