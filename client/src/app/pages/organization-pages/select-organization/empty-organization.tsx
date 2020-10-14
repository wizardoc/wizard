import React, {Component, ReactNode} from 'react';
import {Inject} from '@wizardoc/injector';
import styled from 'styled-components';
import {Button} from '@material-ui/core';

import {OrganizationService, DialogService} from '../../../services';

const Wrapper = styled.div``;

export class EmptyOrganizationPage extends Component {
  @Inject
  organizationService!: OrganizationService;

  @Inject
  dialogService!: DialogService;

  handleCreateOrganizationClick(): void {}

  render(): ReactNode {
    return (
      <Wrapper>
        <Button onClick={() => this.handleCreateOrganizationClick()}>
          创建组织
        </Button>
      </Wrapper>
    );
  }
}
