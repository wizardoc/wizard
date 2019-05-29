import React, {Component, ReactNode} from 'react';

import {TextFieldWrapper} from '../base-info';

export class JoinExistOrganization extends Component {
  render(): ReactNode {
    return (
      <>
        <TextFieldWrapper
          label="选择已存在的组织名称"
          type="text"
          autoComplete="new-password"
        />
      </>
    );
  }
}
