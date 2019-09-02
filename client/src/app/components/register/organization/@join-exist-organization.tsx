import React, {Component, ReactNode} from 'react';

import {FormControl} from '../../../ui';
import {TextFieldWrapper} from '../base-info';

import {HandleProps} from './common/common-props';
import {OrganizationData} from './organization';

interface JoinExistOrganizationProps extends HandleProps {}

export class JoinExistOrganization extends Component<
  JoinExistOrganizationProps
> {
  render(): ReactNode {
    const {onOrganizationInfoChange} = this.props;

    return (
      <FormControl
        rules={{
          choseOrganization: {required: true},
        }}
        onFormDataChange={(data: unknown) =>
          onOrganizationInfoChange(data as OrganizationData)
        }
      >
        <TextFieldWrapper
          name="choseOrganization"
          label="选择已存在的组织"
          type="text"
          autoComplete="new-password"
        />
      </FormControl>
    );
  }
}
