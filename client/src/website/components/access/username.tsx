import {TextFieldProps} from '@material-ui/core/TextField';
import React, {FunctionComponent} from 'react';

import {TextFieldWrapper} from '../register';

import {AccessProps} from './props';

export const UserName: FunctionComponent<AccessProps & TextFieldProps> = props => (
  <TextFieldWrapper
    {...props}
    label="账号"
    type="text"
    placeholder="请输入账号"
    autoComplete="new-password"
    inputProps={{
      maxLength: 20,
    }}
  />
);
