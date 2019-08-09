import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';

import {FormTextField, FormTextFieldProps} from '../../ui';
import {Password} from '../access/password';
import {UserName} from '../access/username';

export const TextFieldWrapper = styled(FormTextField)`
  width: 300px;
  margin: 0 50px;
  margin-top: 15px !important;
` as ComponentType<FormTextFieldProps>;

@observer
export class BaseInfo extends Component {
  render(): ReactNode {
    // const {baseInfoRule, onDataUpdate, getValidator} = this.props;

    return (
      <>
        <TextFieldWrapper
          name="name"
          label="昵称"
          type="text"
          autoComplete="new-password"
          placeholder="输入用于显示的昵称"
          inputProps={{
            maxLength: 12,
          }}
        />
        <UserName name="username" />
        <Password name="password" />
        <TextFieldWrapper
          name="email"
          label="邮箱"
          type="email"
          placeholder="接收变更通知的邮箱"
          autoComplete="new-password"
        />
      </>
    );
  }
}
