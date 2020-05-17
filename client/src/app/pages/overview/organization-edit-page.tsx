import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Inject} from 'react-ts-di';
import {Container} from '@material-ui/core';

import {BaseEditCard, MemberOverview} from 'src/app/components';
import {OrganizationService, OrganizationCardData} from 'src/app/services';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.flatGray};
  padding: 0 40px 20px 70px;
  box-sizing: border-box;
  position: relative;
  overflow: scroll;
`;

const Title = styled.div`
  color: ${props => props.theme.titleColor};
  font-size: 22px;
  margin-top: 20px;
`;

const CardWrapper = styled.div`
  margin-top: 20px;
`;

interface OrganizationEditPageProps {
  organizationInfo: OrganizationCardData;
}

@withRouter
export class OrganizationEditPage extends Component<
  Partial<RouteComponentProps> & OrganizationEditPageProps
> {
  @Inject
  organizationService!: OrganizationService;

  render(): ReactNode {
    const {organizationInfo} = this.props;

    return (
      <Wrapper>
        <Container>
          <Title>基本信息</Title>
          <CardWrapper>
            <BaseEditCard organizationInfo={organizationInfo} />
          </CardWrapper>
          {organizationInfo.isOwner && (
            <>
              <Title>成员管理</Title>
              <CardWrapper>
                <MemberOverview
                  organizeName={organizationInfo.organizeName}
                  members={organizationInfo.members}
                ></MemberOverview>
              </CardWrapper>
            </>
          )}
        </Container>
      </Wrapper>
    );
  }
}
