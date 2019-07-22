import {Button, Link} from '@material-ui/core';
import {LinkProps} from '@material-ui/core/Link';
import React, {Component, ComponentType, ReactNode} from 'react';
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

const ActionButton = styled(Button)`
  width: 180px;
`;

const LoginButton = styled(ActionButton)`
  margin-top: 30px !important;
`;

const RegisterLink = styled(Link)`
  margin-top: 10px !important;
` as ComponentType<LinkProps>;

export class Login extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <UserName />
        <Password />
        <LoginButton variant="contained" color="primary">
          登录
        </LoginButton>
        <RegisterLink href="#">点我立即注册</RegisterLink>
      </Wrapper>
    );
  }
}
