import React, {Component, ReactNode} from 'react';
import {withStyles, WithStyles} from '@material-ui/styles';
import {Theme, createStyles, InputBase} from '@material-ui/core';
import {StyleRules, fade} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

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
  });

class WithStyleHeaderSearch extends Component<WithStyles<typeof styles>> {
  render(): ReactNode {
    const {classes} = this.props;
    const {search, searchIcon, inputRoot, inputInput} = classes;

    return (
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
    );
  }
}

export const HeaderSearch = withStyles(styles)(WithStyleHeaderSearch);
