import {Avatar, IconButton, SvgIcon, Tooltip} from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/Subject';
import React, {Component, ReactNode} from 'react';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {GitHubSvg} from '../../assets';
import {Links} from '../../constant';
import {User} from '../../services';
import {ProfileStore} from '../../store';
import {InjectStore} from '../../utils';

const AvatarWrapper = styled(Avatar)`
  margin-left: 20px;
  font-size: 15px !important;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

export class Funcs extends Component {
  @Inject
  userService!: User;

  @InjectStore(ProfileStore)
  private profileStore!: ProfileStore;

  handleGithubIconClick(): void {
    window.open(Links.GitHub);
  }

  handleAvatarClick(): void {
    this.profileStore.toggleViewProfilePanel();
  }

  render(): ReactNode {
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
        {this.userService.avatar !== '' && (
          <>
            <Tooltip title="待办事项">
              <IconButton color="inherit">
                <SubjectIcon />
              </IconButton>
            </Tooltip>
            <AvatarWrapper onClick={() => this.handleAvatarClick()}>
              {this.userService.avatar}
            </AvatarWrapper>
          </>
        )}
      </Wrapper>
    );
  }
}
