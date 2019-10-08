import {Card, Zoom} from '@material-ui/core';
import {CardProps} from '@material-ui/core/Card';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
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

@observer
export class OrganizationCard extends Component<OrganizationCardProps> {
  @observable
  isMounted = false;

  render(): ReactNode {
    const {organizationCardData} = this.props;

    return (
      <Zoom in={this.isMounted}>
        <CardWrapper>
          <HeaderOwner ownerInfo={organizationCardData.ownerInfo}></HeaderOwner>
          <OrganizationCardInfo
            organizationCardData={organizationCardData}
          ></OrganizationCardInfo>
          <OrganizationActions></OrganizationActions>
        </CardWrapper>
      </Zoom>
    );
  }

  componentDidMount(): void {
    this.isMounted = true;
  }
}
