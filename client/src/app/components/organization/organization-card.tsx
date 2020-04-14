import {Card, Grow} from '@material-ui/core';
import {CardProps} from '@material-ui/core/Card';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';
import {Inject} from 'react-ts-di';

import {OrganizationCardData, Time} from '../../services';

import {HeaderOwner} from './header-owner';
// import {OrganizationActions} from './organization-actions';
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

  @Inject
  time!: Time;

  // async handleOrganizationRemove(
  //   name: string,
  //   delayDuration: number,
  // ): Promise<void> {
  //   this.isMounted = false;

  //   await this.time.sleep(delayDuration / Time.Second);

  //   this.props.onOrganizationRemove(name);
  // }

  render(): ReactNode {
    const {organizationCardData, seqIndex} = this.props;
    const delayDuration = seqIndex * 300;

    return (
      <Grow in={this.isMounted} timeout={delayDuration}>
        <CardWrapper>
          <HeaderOwner
            ownerInfo={organizationCardData.ownerInfo}
            organizeName={organizationCardData.organizeName}
          />
          <OrganizationCardInfo organizationCardData={organizationCardData} />
          {/* <OrganizationActions
            onOrganizationRemove={(name: string) =>
              this.handleOrganizationRemove(name, delayDuration)
            }
            organizationCardData={organizationCardData}
          /> */}
        </CardWrapper>
      </Grow>
    );
  }

  componentDidMount(): void {
    this.isMounted = true;
  }
}
