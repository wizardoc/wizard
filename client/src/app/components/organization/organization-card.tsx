import {Card, Grow} from '@material-ui/core';
import {CardProps} from '@material-ui/core/Card';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';
import {Inject} from 'react-ts-di';

import {OrganizationCardData, Time} from '../../services';

import {HeaderOwner} from './header-owner';
import {OrganizationActions} from './organization-actions';
import {OrganizationCardInfo} from './organization-card-info';

export interface OrganizationActionHandlerProps {
  onOrganizationRemove(name: string): void;
}

export interface OrganizationCardProps extends OrganizationActionHandlerProps {
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

  @Inject
  time!: Time;

  render(): ReactNode {
    const {organizationCardData, seqIndex, onOrganizationRemove} = this.props;
    const delayDuration = seqIndex * 300;

    return (
      <Grow in={this.isMounted} timeout={delayDuration}>
        <CardWrapper>
          <HeaderOwner ownerInfo={organizationCardData.ownerInfo}></HeaderOwner>
          <OrganizationCardInfo
            organizationCardData={organizationCardData}
          ></OrganizationCardInfo>
          <OrganizationActions
            onOrganizationRemove={async name => {
              this.isMounted = false;

              await this.time.sleep(delayDuration / Time.Second);

              onOrganizationRemove(name);
            }}
            organizationCardData={organizationCardData}
          ></OrganizationActions>
        </CardWrapper>
      </Grow>
    );
  }

  componentDidMount(): void {
    this.isMounted = true;
  }
}
