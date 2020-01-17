import {IconButton, SvgIcon, Tooltip} from '@material-ui/core';
import React, {Component, ReactNode} from 'react';
import WorkIcon from '@material-ui/icons/Work';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {GitHubSvg} from '../../assets';
import {Links} from '../../constant';
import {DrawerService, User} from '../../services';
import {ProfileStore} from '../../store';
import {InjectStore} from '../../utils';
import {Todos} from '../optional-tip';
import {Avatar} from '../common';

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

export class Funcs extends Component {
  @Inject
  userService!: User;

  @Inject
  drawerService!: DrawerService;

  @InjectStore(ProfileStore)
  private profileStore!: ProfileStore;

  handleGithubIconClick(): void {
    window.open(Links.GitHub);
  }

  handleAvatarClick(): void {
    this.profileStore.toggleViewProfilePanel();
  }

  handleTodoClick(): void {
    this.drawerService.render(<Todos></Todos>, {anchor: 'right'});
  }

  render(): ReactNode {
    const {isLogin, userInfo} = this.userService;

    return (
      <Wrapper>
        {/* <Tooltip title="notify">
    <IconButton color="inherit">
      <Badge badgeContent={10} max={99} color="secondary">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  </Tooltip> */}
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
        {isLogin && (
          <>
            <Tooltip title="待办事项" onClick={() => this.handleTodoClick()}>
              <IconButton color="inherit">
                <WorkIcon />
              </IconButton>
            </Tooltip>
            <UserInfo onClick={() => this.handleAvatarClick()}>
              <AvatarWrapper>
                <Avatar></Avatar>
              </AvatarWrapper>
              <UserName>{userInfo!.displayName}</UserName>
            </UserInfo>
          </>
        )}
      </Wrapper>
    );
  }
}
