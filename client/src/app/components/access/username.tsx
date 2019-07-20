import React, {FunctionComponent} from 'react';

import {TextFieldWrapper} from '../register';

export const UserName: FunctionComponent = () => (
  <TextFieldWrapper
    name="username"
    label="账号"
    type="text"
    placeholder="请输入账号"
    autoComplete="new-password"
    inputProps={{
      maxLength: 20,
    }}
  />
);
