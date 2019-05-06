import {TextField} from '@material-ui/core';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 24px !important;
  padding-bottom: 34px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
// TextFieldProps
const TextFieldWrapper = styled(TextField)<any>`
  width: 70%;
  margin: 0 50px;
  margin-top: 15px !important;
`;

export class Register extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <TextFieldWrapper
          label="账号"
          type="text"
          autoComplete="new-password"
        />
        <TextFieldWrapper
          label="密码"
          type="password"
          autoComplete="new-password"
        />
      </Wrapper>
    );
  }
}
