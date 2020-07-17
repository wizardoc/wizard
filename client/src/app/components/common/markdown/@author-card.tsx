import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Document} from '@wizardoc/shared';

import {Avatar} from '../avatar';

export interface AuthorCardProps {
  author: Document['author'];
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
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

export class AuthorCard extends Component<AuthorCardProps> {
  render(): ReactNode {
    const {
      author: {displayName, avatar},
    } = this.props;

    return (
      <Wrapper>
        <StyledAvatar lnk={avatar} username={displayName} />
        <AuthorInfo>
          <AuthorName>{displayName}</AuthorName>
          <AuthorIntro>我是 Intro 的占位符</AuthorIntro>
        </AuthorInfo>
      </Wrapper>
    );
  }
}
