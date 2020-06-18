import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Inject} from '@wizardoc/injector';

import {
  BaseEditCard,
  MemberOverview,
  OrganizationFunction,
} from 'src/app/components';
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
  font-size: 18px;
  margin-top: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardWrapper = styled.div`
  margin-top: 20px;
`;

const BaseEditCardWrapper = styled.div`
  flex: 2;
  margin-right: 20px;
`;

const MemberManagerCardWrapper = styled.div`
  flex: 3;
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
          <BaseEditCardWrapper>
            <Title>基本信息</Title>
            <CardWrapper>
              <BaseEditCard organizationInfo={organizationInfo} />
            </CardWrapper>
            <Title>组织功能</Title>
            <CardWrapper>
              <OrganizationFunction organizationID={organizationInfo.id} />
            </CardWrapper>
          </BaseEditCardWrapper>
          <MemberManagerCardWrapper>
            <Title>成员管理</Title>
            <CardWrapper>
              <MemberOverview
                organizeName={organizationInfo.organizeName}
                members={organizationInfo.members}
              ></MemberOverview>
            </CardWrapper>
          </MemberManagerCardWrapper>
        </Container>
      </Wrapper>
    );
  }
}
