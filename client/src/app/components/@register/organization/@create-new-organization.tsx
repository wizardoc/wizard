import React, {Component, ReactNode} from 'react';

import {TextFieldWrapper} from '../base-info';

export class CreateNewOrganization extends Component {
  render(): ReactNode {
    return (
      <>
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
          name="organization-description"
          label="组织描述"
          type="text"
          autoComplete="new-password"
          inputProps={{
            maxLength: 50,
          }}
        />
      </>
    );
  }
}
