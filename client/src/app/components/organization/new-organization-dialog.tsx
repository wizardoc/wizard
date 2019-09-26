import {Button} from '@material-ui/core';
import {ButtonProps} from '@material-ui/core/Button';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode, createRef} from 'react';
import styled from 'styled-components';

import {FormControl} from '../../ui';
import {CreateNewOrganization, OrganizationData} from '../register';

const Wrapper = styled.div`
  width: 345px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Submit = styled(Button)`
  margin: 10px 0 20px 0 !important;
` as ComponentType<ButtonProps>;

@observer
export class NewOrganizationDialog extends Component {
  @observable
  organizationData!: OrganizationData;

  formControlRef = createRef<FormControl>();

  handleCreateClick(): void {}

  render(): ReactNode {
    return (
      <Wrapper>
        <CreateNewOrganization
          formControlRef={this.formControlRef}
          onOrganizationInfoChange={info => (this.organizationData = info)}
        ></CreateNewOrganization>
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
