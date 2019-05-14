import {IconButton, InputAdornment, TextField} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

const TextFieldWrapper = styled(TextField)<any>`
  width: 70%;
  margin: 0 50px;
  margin-top: 15px !important;
`;

@observer
export class BaseInfo extends Component {
  @observable
  private isViewPassword = false;

  handleViewPasswordClick(): void {
    this.isViewPassword = !this.isViewPassword;
  }

  render(): ReactNode {
    return (
      <>
        <TextFieldWrapper
          label="昵称"
          type="text"
          autoComplete="new-password"
        />
        <TextFieldWrapper
          label="账号"
          type="text"
          autoComplete="new-password"
        />
        <TextFieldWrapper
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
          }}
        />
        <TextFieldWrapper
          label="邮箱"
          type="email"
          autoComplete="new-password"
        />
      </>
    );
  }
}
