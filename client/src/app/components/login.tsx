import {Button, Link} from '@material-ui/core';
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

const ActionButton = styled(Button)`
  width: 160px;
`;

const LoginButton = styled(ActionButton)``;

const ActionPlace = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px !important;
  box-sizing: border-box;
  padding: 0 100px;
`;

export class Login extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <UserName />
        <Password />
        <ActionPlace>
          <Link href="#">点我立即注册</Link>
          <LoginButton variant="contained" color="primary">
            登录
          </LoginButton>
        </ActionPlace>
      </Wrapper>
    );
  }
}
