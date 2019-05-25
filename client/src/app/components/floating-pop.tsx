import {Fab} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import MemoryIcon from '@material-ui/icons/Memory';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

interface MenuIconWrapperProps {
  isRotate?: boolean;
}

interface FloatActions {
  name: string;
  icon: any;
  tooltipTitle?: string;
  onClick?(): void;
}

const Wrapper = styled.div`
  position: fixed;
  right: 50px;
  bottom: 150px;
`;

// const MenuIcon = styled(AddIcon)<MenuIconProps>`
//   transition: 0.8s all;
//   transform: ${props => (props.isRotate ? 'rotate(405deg)' : 'rotate(0deg)')};
// ` as React.ComponentType<IconProps & MenuIconProps>;

const IconWrapper = styled.div<MenuIconWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.8s all;
  transform: ${props => (props.isRotate ? 'rotate(405deg)' : 'rotate(0deg)')};
`;

@observer
export class FloatingPop extends Component {
  private actions: FloatActions[] = [
    {name: 'write', icon: <EditIcon />},
    {name: 'profile', icon: <EditIcon />},
  ];

  @observable
  private isOpenMenu = false;

  handleFloatingPopClick(): void {
    this.isOpenMenu = !this.isOpenMenu;
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <Fab
          color="secondary"
          aria-label="Add"
          onMouseOver={() => this.handleFloatingPopClick()}
        >
          <IconWrapper isRotate={this.isOpenMenu}>
            <MemoryIcon />
          </IconWrapper>
        </Fab>
        <SpeedDial
          ariaLabel="抽屉"
          icon={<MemoryIcon />}
          open={this.isOpenMenu}
        >
          {this.actions.map(({name, icon, tooltipTitle}) => (
            <SpeedDialAction
              key={name}
              icon={icon}
              tooltipTitle={tooltipTitle || name}
            />
          ))}
        </SpeedDial>
      </Wrapper>
    );
  }
}
