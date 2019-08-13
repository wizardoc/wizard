import React, {Component, ReactNode} from 'react';

import {FormControl} from '../../../ui';
import {TextFieldWrapper} from '../base-info';
import {OrganizationData} from '../entry';

import {OrganizationProps} from './organization';

interface CreateNewOrganizationProps extends OrganizationProps {}

export class CreateNewOrganization extends Component<
  CreateNewOrganizationProps
> {
  render(): ReactNode {
    return (
      <FormControl
        rules={{
          organizationName: {required: true},
          organizationDescription: {required: true},
        }}
        onFormDataChange={(info: unknown): void =>
          this.props.onOrganizationInfoChange(info as OrganizationData)
        }
      >
        <TextFieldWrapper
          name="organizationName"
          label="组织名称"
          type="text"
          autoComplete="new-password"
          inputProps={{
            maxLength: 15,
          }}
        />
        <TextFieldWrapper
          name="organizationDescription"
          label="组织描述"
          type="text"
          autoComplete="new-password"
          inputProps={{
            maxLength: 50,
          }}
        />
      </FormControl>
    );
  }
}
