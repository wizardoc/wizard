import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {Avatar} from '../common';

export interface ContributorInfo {
  username: string;
  addr: string;
}

interface ContributorAvatarProps extends ContributorInfo {}

const AvatarBox = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 1000px;
  margin: 0 10px;
  box-sizing: content-box;
  overflow: hidden;
`;

const ContributorName = styled.div`
  font-weight: 300;
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
`;

const Wrapper = styled.div``;

export class ContributorAvatar extends Component<ContributorAvatarProps> {
  render(): ReactNode {
    const {addr, username} = this.props;

    return (
      <Wrapper>
        <AvatarBox>
          <Avatar lnk={addr} username={username} />
        </AvatarBox>
        <ContributorName>{username}</ContributorName>
      </Wrapper>
    );
  }
}
