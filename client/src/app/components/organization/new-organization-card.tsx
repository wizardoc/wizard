import {Button} from '@material-ui/core';
import {ButtonProps} from '@material-ui/core/Button';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode, createRef} from 'react';
import styled from 'styled-components';
import {Inject} from '@wizardoc/injector';

import {FormControl} from '../../ui';
import {CreateNewOrganization, OrganizationData} from '../register';
import {OrganizationService, Toast} from '../../services';

interface NewOrganizationCardProps {
  onCreateClick?(organizationData: OrganizationData): void;
}

const Wrapper = styled.div`
  width: 345px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Submit = styled(Button)`
  margin: 30px 0 10px 0 !important;
` as ComponentType<ButtonProps>;

@observer
export class NewOrganizationCard extends Component<NewOrganizationCardProps> {
  @Inject
  organizationService!: OrganizationService;

  @observable
  organizationData!: OrganizationData;

  @Inject
  toast!: Toast;

  formControlRef = createRef<FormControl>();

  async handleCreateClick(): Promise<void> {
    const {current} = this.formControlRef;

    if (!current) {
      return;
    }

    if (!current.validate()) {
      return;
    }

    const {organizationName, organizationDescription} = this.organizationData;
    const {onCreateClick = (): void => {}} = this.props;

    try {
      await this.organizationService.newOrganization(
        organizationName,
        organizationDescription!,
      );
    } catch (e) {
      this.toast.error('组织已存在!');

      return;
    }

    onCreateClick(this.organizationData);
    this.toast.success('创建组织成功!');
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <CreateNewOrganization
          formControlRef={this.formControlRef}
          onOrganizationInfoChange={info => (this.organizationData = info)}
        />
        <Submit
          variant="outlined"
          onClick={() => this.handleCreateClick()}
          color="primary"
        >
          立即创建
        </Submit>
      </Wrapper>
    );
  }
}
