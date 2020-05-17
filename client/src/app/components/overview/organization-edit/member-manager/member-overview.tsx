import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Card} from '@material-ui/core';

import {UserBaseInfo} from 'src/app/services';

import {SubTitle} from '../../@common';

import {MemberBox} from './member-box';

const Wrapper = styled(Card)`
  padding: 20px !important;
`;

const MemberWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export interface MemberOverviewProps {
  members: UserBaseInfo[];
  organizeName: string;
}

export class MemberOverview extends Component<MemberOverviewProps> {
  render(): ReactNode {
    const {members, organizeName} = this.props;
    const renderMemberBoxes = members.map(({avatar}) => (
      <MemberBox avatar={avatar} organizeName={organizeName}></MemberBox>
    ));

    return (
      <Wrapper>
        <SubTitle>成员概览</SubTitle>
        <MemberWrapper>
          {renderMemberBoxes}
          <MemberBox organizeName={organizeName} />
        </MemberWrapper>
      </Wrapper>
    );
  }
}
