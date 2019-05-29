import React, {Component, ReactNode} from 'react';

import {TextFieldWrapper} from '../base-info';

export class CreateNewOrganization extends Component {
  render(): ReactNode {
    return (
      <>
        <TextFieldWrapper
          label="组织名称"
          type="text"
          autoComplete="new-password"
        />
        <TextFieldWrapper
          label="组织描述"
          type="text"
          autoComplete="new-password"
        />
      </>
    );
  }
}
