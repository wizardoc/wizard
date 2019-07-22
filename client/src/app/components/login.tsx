import {Button, Link} from '@material-ui/core';
import {LinkProps} from '@material-ui/core/Link';
import React, {Component, ComponentType, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styled from 'styled-components';

import {USER} from '../constant';

import {Password} from './access/password';
import {UserName} from './access/username';

interface TLoginProps extends RouteComponentProps {}

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
  cursor: pointer !important;
  margin-top: 10px !important;
` as ComponentType<LinkProps>;

class TLogin extends Component<TLoginProps> {
  render(): ReactNode {
    return (
      <Wrapper>
        <UserName />
        <Password />
        <LoginButton variant="contained" color="primary">
          登录
        </LoginButton>
        <RegisterLink onClick={() => this.handleRegisterClick()}>
          点我立即注册
        </RegisterLink>
      </Wrapper>
    );
  }

  handleRegisterClick(): void {
    const {history} = this.props;

    history.push(USER.REGISTER);
  }
}

export const Login = withRouter(TLogin);
