import React, {Component, ReactNode} from 'react';
import {Inject} from '@wizardoc/injector';
import styled from 'styled-components';

import {OrganizationService} from '../../../services';
import {FetchData, FetchDataComponentProps} from '../../../components';

const Wrapper = styled.div``;

@FetchData(async ({extract}) =>
  extract(OrganizationService).getAllJoinOrganization(),
)
export class SelectOrganizationPage extends Component<FetchDataComponentProps> {
  @Inject
  organizationService!: OrganizationService;

  render(): ReactNode {
    console.info(this.props.data);

    return <Wrapper></Wrapper>;
  }
}
