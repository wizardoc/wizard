import {Card, Grow} from '@material-ui/core';
import {CardProps} from '@material-ui/core/Card';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {ComponentType, ReactNode, PureComponent} from 'react';
import styled from 'styled-components';
import {Inject} from '@wizardoc/injector';

import {OrganizationCardData, Time} from '../../services';

import {HeaderOwner} from './header-owner';
// import {OrganizationActions} from './organization-actions';
import {OrganizationCardInfo} from './organization-card-info';

export interface OrganizationCardProps {
  organizationCardData: OrganizationCardData;
  seqIndex: number;
  onCardClick?(): void;
}

const CardWrapper = styled(Card)`
  width: calc(25% - 25px);
  min-width: 300px;
  max-width: 400px;
  margin: 12.5px;
` as ComponentType<CardProps>;

@observer
export class OrganizationCard extends PureComponent<OrganizationCardProps> {
  @observable
  isMounted = false;

  @Inject
  time!: Time;

  render(): ReactNode {
    const {
      organizationCardData,
      seqIndex,
      onCardClick = (): void => {},
    } = this.props;
    const delayDuration = seqIndex * 300;

    return (
      <Grow in={this.isMounted} timeout={delayDuration}>
        <CardWrapper>
          <HeaderOwner
            permissions={organizationCardData.permissions}
            ownerInfo={organizationCardData.ownerInfo}
            organizeName={organizationCardData.organizeName}
            id={organizationCardData.id}
          />
          <OrganizationCardInfo
            onContentClick={onCardClick}
            organizationCardData={organizationCardData}
          />
        </CardWrapper>
      </Grow>
    );
  }

  componentDidMount(): void {
    this.isMounted = true;
  }
}
