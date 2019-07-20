import {Button} from '@material-ui/core';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {Password} from './access/password';
import {UserName} from './access/username';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 32px;
`;

const LoginButton = styled(Button)`
  width: 120px;
  margin-top: 30px !important;
`;

export class Login extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <UserName />
        <Password />
        <LoginButton variant="contained" color="primary">
          登录
        </LoginButton>
      </Wrapper>
    );
  }
}
