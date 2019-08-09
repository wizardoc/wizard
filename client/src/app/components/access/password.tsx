import {IconButton, InputAdornment} from '@material-ui/core';
import {TextFieldProps} from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';

import {TextFieldWrapper} from '../register';

import {AccessProps} from './props';

@observer
export class Password extends Component<AccessProps & TextFieldProps> {
  @observable
  private isViewPassword = false;

  render(): ReactNode {
    return (
      <TextFieldWrapper
        {...this.props}
        label="密码"
        type={this.isViewPassword ? 'text' : 'password'}
        autoComplete="new-password"
        placeholder="请输入密码"
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
    );
  }

  private handleViewPasswordClick(): void {
    this.isViewPassword = !this.isViewPassword;
  }
}
