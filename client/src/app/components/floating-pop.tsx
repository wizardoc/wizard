import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

interface MenuIconWrapperProps {
  isRotate?: boolean;
}

const Wrapper = styled.div`
  position: fixed;
  right: 50px;
  bottom: 50px;
`;

// const MenuIcon = styled(AddIcon)<MenuIconProps>`
//   transition: 0.8s all;
//   transform: ${props => (props.isRotate ? 'rotate(405deg)' : 'rotate(0deg)')};
// ` as React.ComponentType<IconProps & MenuIconProps>;

const IconWrapper = styled.div<MenuIconWrapperProps>`
  transition: 0.8s all;
  transform: ${props => (props.isRotate ? 'rotate(405deg)' : 'rotate(0deg)')};
`;

@observer
export class FloatingPop extends Component {
  @observable
  isOpenMenu = false;

  handleFloatingPopClick(): void {
    this.isOpenMenu = !this.isOpenMenu;
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <Fab
          color="secondary"
          aria-label="Add"
          onClick={() => this.handleFloatingPopClick()}
        >
          <IconWrapper isRotate={this.isOpenMenu}>
            <AddIcon />
          </IconWrapper>
        </Fab>
      </Wrapper>
    );
  }
}
