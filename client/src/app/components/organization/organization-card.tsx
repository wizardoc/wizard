import {Card, Grow} from '@material-ui/core';
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
  seqIndex: number;
}

const CardWrapper = styled(Card)`
  width: calc(25% - 25px);
  min-width: 300px;
  max-width: 400px;
  margin: 12.5px;
` as ComponentType<CardProps>;

@observer
export class OrganizationCard extends Component<OrganizationCardProps> {
  @observable
  isMounted = false;

  render(): ReactNode {
    const {organizationCardData, seqIndex} = this.props;

    return (
      <Grow in={this.isMounted} timeout={seqIndex * 300}>
        <CardWrapper>
          <HeaderOwner ownerInfo={organizationCardData.ownerInfo}></HeaderOwner>
          <OrganizationCardInfo
            organizationCardData={organizationCardData}
          ></OrganizationCardInfo>
          <OrganizationActions></OrganizationActions>
        </CardWrapper>
      </Grow>
    );
  }

  componentDidMount(): void {
    this.isMounted = true;
  }
}
