import {SvgIcon, Badge} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, {Component, ReactNode} from 'react';
import WorkIcon from '@material-ui/icons/Work';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import {GitHubSvg} from '../../assets';
import {Links} from '../../constant';
import {DrawerService, User} from '../../services';
import {ProfileStore} from '../../store';
import {InjectStore} from '../../utils';
import {Todos} from '../optional-tip';
import {Avatar} from '../common';

import {IconFunc, IconFuncs} from './@icon-funcs';

const AvatarWrapper = styled.div`
  width: 35px !important;
  height: 35px !important;
  margin-left: 20px;
  font-size: 15px !important;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserName = styled.div`
  margin-left: 10px;
`;

@withRouter
export class Funcs extends Component<Partial<RouteComponentProps>> {
  @Inject
  userService!: User;

  @Inject
  drawerService!: DrawerService;

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
        <Badge badgeContent={10} max={99} color="secondary">
          <NotificationsIcon />
        </Badge>
      ),
    },
  ];

  @InjectStore(ProfileStore)
  private profileStore!: ProfileStore;

  handleGithubIconClick(): void {
    window.open(Links.GitHub);
  }

  handleAvatarClick(): void {
    this.profileStore.toggleViewProfilePanel();
  }

  handleTodoClick(): void {
    this.drawerService.render(<Todos />, {anchor: 'right'});
  }

  handleNotifyClick(): void {
    this.props.history!.push('/center/messages');
  }

  render(): ReactNode {
    const {userInfo, isLogin} = this.userService;

    return (
      <Wrapper>
        <IconFuncs iconFuncs={this.iconFuncs} />
        {isLogin && (
          <UserInfo onClick={() => this.handleAvatarClick()}>
            <AvatarWrapper>
              <Avatar></Avatar>
            </AvatarWrapper>
            <UserName>{userInfo!.displayName}</UserName>
          </UserInfo>
        )}
      </Wrapper>
    );
  }
}
