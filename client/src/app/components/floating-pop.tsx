import EditIcon from '@material-ui/icons/Edit';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import MemoryIcon from '@material-ui/icons/Memory';
import MessageIcon from '@material-ui/icons/Message';
import PersonIcon from '@material-ui/icons/Person';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import {action, observable} from 'mobx';
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

// const FunctionBar = styled(SpeedDial)`
//   > .MuiButtonBase-root {
//     background: ${props => props.theme.secondaryColor};
//   }
// ` as ComponentType<SpeedDialProps>;

@observer
export class FloatingPop extends Component {
  private actions: FloatActions[] = [
    {name: '新规范', icon: <EditIcon />},
    {name: '个人信息', icon: <PersonIcon />},
    {name: '邀请新的组织成员', icon: <GroupAddIcon />},
    {name: '消息', icon: <MessageIcon />},
    {name: '创建新组织', icon: <LocationCityIcon />},
  ];

  @observable
  private isOpenMenu = false;

  @action
  menuToggle(): void {
    this.isOpenMenu = !this.isOpenMenu;
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <SpeedDial
          ButtonProps={{
            color: 'secondary',
          }}
          ariaLabel="抽屉"
          icon={
            <IconWrapper isRotate={this.isOpenMenu}>
              <MemoryIcon />
            </IconWrapper>
          }
          onMouseEnter={() => this.menuToggle()}
          onMouseLeave={() => this.menuToggle()}
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
