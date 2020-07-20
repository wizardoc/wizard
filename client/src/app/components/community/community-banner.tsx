import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Button} from '@material-ui/core';

import GroupImg from 'src/app/assets/static/group.svg';

interface PictureProps {
  src: string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 250px;
  background: ${props => props.theme.primaryColor};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const JoinCommunity = styled(Button)`
  width: 158px;
  background: ${props => props.theme.white} !important;
  color: ${props => props.theme.primaryColor} !important;
`;

const Picture = styled.div<PictureProps>`
  width: 200px;
  height: 200px;
  background: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Text = styled.div`
  font-size: 34px;
  color: white;
  font-weight: 300;
`;

const Title = styled.div`
  font-size: 34px;
  color: white;
  font-weight: 300;
`;

const SubTitle = styled.div``;

export class CommunityBanner extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <Picture src={GroupImg}></Picture>
        <Text>
          <Title>加入社区</Title>
          <SubTitle>让知识管理更有趣</SubTitle>
          <JoinCommunity variant="contained">立即注册</JoinCommunity>
        </Text>
      </Wrapper>
    );
  }
}
