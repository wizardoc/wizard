import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Document} from '@wizardoc/shared';
import AddIcon from '@material-ui/icons/Add';
import {Button} from '@material-ui/core';
import {Inject} from '@wizardoc/injector';

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

export class AuthorCard extends Component<AuthorCardProps> {
  @Inject
  user!: User;

  render(): ReactNode {
    const {
      author: {displayName, avatar, username},
    } = this.props;
    const isSelf = this.user.userInfo.username === username;

    return (
      <Wrapper>
        <InfoContainer>
          <StyledAvatar lnk={avatar} username={displayName} />
          <AuthorInfo>
            <AuthorName>{displayName}</AuthorName>
            <AuthorIntro>我是 Intro 的占位符</AuthorIntro>
          </AuthorInfo>
        </InfoContainer>
        {!isSelf && (
          <FollowButton
            variant="contained"
            color="primary"
            startIcon={<AddIcon></AddIcon>}
          >
            关注作者
          </FollowButton>
        )}
      </Wrapper>
    );
  }
}
