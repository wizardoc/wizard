import {Card} from '@material-ui/core';
import {CardProps} from '@material-ui/core/Card';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';

import {OrganizationCardData} from '../../services';

import {HeaderOwner} from './header-owner';
import {OrganizationActions} from './organization-actions';
import {OrganizationCardInfo} from './organization-card-info';

export interface OrganizationCardProps {
  organizationCardData: OrganizationCardData;
}

const CardWrapper = styled(Card)`
  width: 345px;
` as ComponentType<CardProps>;

export class OrganizationCard extends Component<OrganizationCardProps> {
  render(): ReactNode {
    const {organizationCardData} = this.props;

    return (
      <CardWrapper>
        <HeaderOwner ownerInfo={organizationCardData.ownerInfo}></HeaderOwner>
        <OrganizationCardInfo
          organizationCardData={organizationCardData}
        ></OrganizationCardInfo>
        <OrganizationActions></OrganizationActions>
      </CardWrapper>
    );
  }
}
