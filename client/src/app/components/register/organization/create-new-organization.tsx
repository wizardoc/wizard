import DescriptionIcon from '@material-ui/icons/Description';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import React, {Component, ComponentType, ReactNode, RefObject} from 'react';
import styled from 'styled-components';

import {FormControl, Input, WithIconInputProps} from '../../../ui';

import {HandleProps} from './common/common-props';
import {OrganizationData} from './organization';

interface CreateNewOrganizationProps extends HandleProps {
  formControlRef?: RefObject<FormControl>;
}

const IconInput = styled(Input.WithIcon)`
  width: 300px;
  margin: 0 50px;
` as ComponentType<WithIconInputProps>;

export class CreateNewOrganization extends Component<
  CreateNewOrganizationProps
> {
  render(): ReactNode {
    return (
      <FormControl
        ref={this.props.formControlRef}
        rules={{
          organizationName: {required: true},
          organizationDescription: {required: true},
        }}
        onFormDataChange={(info: unknown): void =>
          this.props.onOrganizationInfoChange(info as OrganizationData)
        }
      >
        <IconInput
          icon={<LocationCityIcon />}
          iconSize="25px"
          name="organizationName"
          label="组织名称"
          type="text"
          autoComplete="new-password"
          inputProps={{
            maxLength: 15,
          }}
        />
        <IconInput
          icon={<DescriptionIcon />}
          iconSize="25px"
          name="organizationDescription"
          label="组织描述"
          type="text"
          autoComplete="new-password"
          inputProps={{
            maxLength: 30,
          }}
        />
      </FormControl>
    );
  }
}
