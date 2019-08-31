import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

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

const Avatar = styled.img`
  width: 100%;
  height: 100%;
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
          <Avatar src={addr}></Avatar>
        </AvatarBox>
        <ContributorName>{username}</ContributorName>
      </Wrapper>
    );
  }
}
