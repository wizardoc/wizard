import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Inject} from 'react-ts-di';

import {BaseEditCard} from 'src/app/components';
import {OrganizationService, OrganizationCardData} from 'src/app/services';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.flatGray};
  padding: 20px 40px 20px 70px;
  box-sizing: border-box;
  position: relative;
  overflow: scroll;
`;

const Title = styled.div`
  color: ${props => props.theme.titleColor};
  font-size: 22px;
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
        <Title>基本信息</Title>
        <CardWrapper>
          <BaseEditCard organizationInfo={organizationInfo} />
        </CardWrapper>
      </Wrapper>
    );
  }
}
