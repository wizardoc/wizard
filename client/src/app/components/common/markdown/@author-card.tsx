import CheckIcon from '@material-ui/icons/Check';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Document} from '@wizardoc/shared';
import AddIcon from '@material-ui/icons/Add';
import {Button} from '@material-ui/core';
import {Inject} from '@wizardoc/injector';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import {User} from 'src/app/services';

import {Avatar} from '../avatar';

export interface AuthorCardProps {
  author: Document['author'];
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledAvatar = styled(Avatar)``;

const AuthorInfo = styled.div`
  margin-left: 10px;
`;

const AuthorName = styled.div`
  color: ${props => props.theme.titleColor};
  font-size: 18px;
  font-weight: 500;
`;

const AuthorIntro = styled.div`
  color: ${props => props.theme.subTitleGray};
  font-size: 14px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FollowButton = styled(Button)``;

@observer
export class AuthorCard extends Component<AuthorCardProps> {
  @Inject
  user!: User;

  @observable
  isFollowed = false;

  constructor(props: AuthorCardProps) {
    super(props);

    this.isFollowed = !!this.user.userInfo.followUsers.find(
      ({id}) => id === props.author.id,
    );
  }

  get followButtonText(): string {
    return this.isFollowed ? '已关注' : '关注作者';
  }

  get followButtonIcon(): ReactNode {
    return this.isFollowed ? <CheckIcon /> : <AddIcon />;
  }

  async handleFollowAuthorClick(id: string): Promise<void> {
    const result = await this.user.followUser(id);

    result.success(() => (this.isFollowed = true));
  }

  render(): ReactNode {
    const {
      author: {displayName, avatar, username, id, intro},
    } = this.props;
    const isSelf = this.user.userInfo.username === username;

    return (
      <Wrapper>
        <InfoContainer>
          <StyledAvatar id={id} lnk={avatar} displayName={displayName} />
          <AuthorInfo>
            <AuthorName>{displayName}</AuthorName>
            <AuthorIntro>{intro}</AuthorIntro>
          </AuthorInfo>
        </InfoContainer>
        {!isSelf && (
          <FollowButton
            disabled={this.isFollowed}
            variant="contained"
            color="primary"
            startIcon={this.followButtonIcon}
            onClick={() => this.handleFollowAuthorClick(id)}
          >
            {this.followButtonText}
          </FollowButton>
        )}
      </Wrapper>
    );
  }
}
