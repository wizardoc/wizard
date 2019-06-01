import {IconButton, InputAdornment} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';

import {FormTextField, FormTextFieldProps, FromControl} from '../../ui';

export const TextFieldWrapper = styled(FormTextField)`
  width: 70%;
  margin: 0 50px;
  margin-top: 15px !important;
` as ComponentType<FormTextFieldProps>;

@observer
export class BaseInfo extends Component {
  @observable
  private isViewPassword = false;

  handleViewPasswordClick(): void {
    this.isViewPassword = !this.isViewPassword;
  }

  render(): ReactNode {
    return (
      <FromControl
        rules={{
          name: {
            validator: 'required',
          },
        }}
      >
        <TextFieldWrapper
          name="name"
          label="昵称"
          type="text"
          autoComplete="new-password"
          inputProps={{
            maxLength: 12,
          }}
        />
        <TextFieldWrapper
          name="username"
          label="账号"
          type="text"
          autoComplete="new-password"
          inputProps={{
            maxLength: 20,
          }}
        />
        <TextFieldWrapper
          name="password"
          label="密码"
          type={this.isViewPassword ? 'text' : 'password'}
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="显示密码"
                  onClick={() => this.handleViewPasswordClick()}
                >
                  {this.isViewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            maxLength: 22,
          }}
        />
        <TextFieldWrapper
          name="email"
          label="邮箱"
          type="email"
          autoComplete="new-password"
        />
      </FromControl>
    );
  }
}
