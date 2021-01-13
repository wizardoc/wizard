import {AppBar, Toolbar} from '@material-ui/core';
import {AppBarProps} from '@material-ui/core/AppBar';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';

import {Funcs} from './@funcs';
import {HeaderBarTabs} from './header-bar-tabs';
import {HeaderSearch} from './@header-search';

interface AppBarWrapperProps {
  isFixed: boolean;
}

export interface HeaderBarProps {
  isFixed: boolean;
}

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppBarWrapper = styled(AppBar)<AppBarWrapperProps>`
  ${props => props.isFixed && 'top: 0;position: sticky !important;'}
` as ComponentType<AppBarProps & AppBarWrapperProps>;

@observer
export class HeaderBar extends Component<HeaderBarProps> {
  render(): ReactNode {
    const {isFixed} = this.props;

    return (
      <AppBarWrapper position="static" isFixed={isFixed}>
        <Toolbar variant="dense">
          <Row />
          <HeaderBarTabs />
          <HeaderSearch />
          <Funcs />
        </Toolbar>
      </AppBarWrapper>
    );
  }
}
