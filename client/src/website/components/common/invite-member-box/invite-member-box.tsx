import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {Button, Typography} from '@material-ui/core';

import {Default} from '../default';

import {UserSearchLine, UserMetaData} from './user-search-line';

const Wrapper = styled.div``;

const StyledUserSearchLine = styled(UserSearchLine)`
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const InviteUserPlace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  border: dashed 1px ${props => props.theme.black};
  margin-top: 50px;
  transition: all 0.3s;

  &:hover {
    border-color: ${props => props.theme.primaryColor};
    color: ${props => props.theme.primaryColor};
  }
`;

const DefaultInviteText = styled(Typography)``;

const InvitedUserList = styled.div`
  width: 100%;
  height: 100%;
`;

@observer
export class InviteMemberBox extends Component {
  @observable
  invitedUser: UserMetaData[] = [];

  @observable
  userMetadata: UserMetaData[] = [];

  get isInviteButtonDisabled(): boolean {
    return (
      !this.userMetadata.find(({status}) => status === 'success') ||
      !this.userMetadata.length
    );
  }

  handleInviteButtonClick(): void {
    this.invitedUser.push(...this.userMetadata.filter(item => item.status === 'success'));
  }

  handleUserSearchLineChange(metadata: UserMetaData[]): void {
    this.userMetadata = metadata;
  }

  render(): ReactNode {
    return (
      <Wrapper {...this.props}>
        <Header>
          <StyledUserSearchLine
            placeholder="请输入需要邀请的组织成员"
            helperText="输入用户的用户名，按回车键进行查找"
            onChange={this.handleUserSearchLineChange.bind(this)}
          />
          <Button
            onClick={() => this.handleInviteButtonClick()}
            color="primary"
            disabled={this.isInviteButtonDisabled}
          >
            邀请
          </Button>
        </Header>
        <InviteUserPlace>
          <Default
            condition={() => !this.invitedUser.length}
            defaultView={
              <DefaultInviteText>邀请进入组织的成员在这里！</DefaultInviteText>
            }
          >
            <InvitedUserList />
          </Default>
        </InviteUserPlace>
      </Wrapper>
    );
  }
}
