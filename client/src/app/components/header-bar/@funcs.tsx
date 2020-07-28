import {SvgIcon, Badge, Divider, Button} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, {ReactNode, PureComponent} from 'react';
import WorkIcon from '@material-ui/icons/Work';
import {Inject} from '@wizardoc/injector';
import styled from 'styled-components';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {observer} from 'mobx-react';

import {Popover} from 'src/app/ui';

import {GitHubSvg} from '../../assets';
import {Links} from '../../constant';
import {DrawerService, User, NotifyService} from '../../services';
import {Todos} from '../optional-tip';
import {Avatar, LoginPermission} from '../common';
import {Profile} from '../user';

import {IconFunc, IconFuncs} from './@icon-funcs';

const StyledAvatar = styled(Avatar)`
  width: 35px !important;
  height: 35px !important;
  font-size: 15px !important;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const UserInfo = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 20px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  padding: 0 10px;

  &:hover {
    background: ${props => props.theme.buttonHoverBg};
  }
`;

const UserName = styled.div`
  margin-left: 10px;
`;

const ButtonGroup = styled.div``;

const RegisterButton = styled(Button)`
  background: ${props => props.theme.white} !important;
  color: ${props => props.theme.primaryColor} !important;
  margin-left: 10px !important;
`;

const LoginButton = styled(Button)`
  border-color: ${props => props.theme.white} !important;
  color: ${props => props.theme.white} !important;
  margin-left: 12px !important;
`;

@withRouter
@observer
export class Funcs extends PureComponent<Partial<RouteComponentProps>> {
  @Inject
  userService!: User;

  @Inject
  drawerService!: DrawerService;

  @Inject
  notifyService!: NotifyService;

  iconFuncs: IconFunc[] = [
    {
      tooltip: 'GitHub',
      handler: () => this.handleGithubIconClick(),
      body: (
        <SvgIcon>
          <GitHubSvg />
        </SvgIcon>
      ),
    },
    {
      tooltip: '待办事项',
      handler: () => this.handleTodoClick(),
      isLogin: true,
      body: <WorkIcon />,
    },
    {
      tooltip: '消息中心',
      handler: () => this.handleNotifyClick(),
      isLogin: true,
      body: (
        <Badge
          badgeContent={this.notifyService.unreadMessageCount}
          max={99}
          color="secondary"
        >
          <NotificationsIcon />
        </Badge>
      ),
    },
  ];

  handleGithubIconClick(): void {
    window.open(Links.GitHub);
  }

  handleAvatarClick(): void {
    this.drawerService.render(<Profile />, {anchor: 'right'});
  }

  handleTodoClick(): void {
    this.drawerService.render(<Todos />, {anchor: 'right'});
  }

  handleNotifyClick(): void {
    this.props.history!.push('/center/messages');
  }

  render(): ReactNode {
    const {userInfo, isLogin} = this.userService;
    const {displayName, avatar} = userInfo ?? {};

    return (
      <Wrapper>
        <IconFuncs iconFuncs={this.iconFuncs} />
        <LoginPermission
          loginView={
            <UserInfo onClick={() => this.handleAvatarClick()}>
              <StyledAvatar
                lnk={avatar}
                displayName={displayName}
              ></StyledAvatar>
              <UserName>{displayName}</UserName>
            </UserInfo>
          }
          defaultView={
            <ButtonGroup>
              <RegisterButton variant="contained">注册</RegisterButton>
              <LoginButton variant="outlined">登录</LoginButton>
            </ButtonGroup>
          }
        />
      </Wrapper>
    );
  }
}
