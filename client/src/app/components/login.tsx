import {Button, Link} from '@material-ui/core';
import {LinkProps} from '@material-ui/core/Link';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
// import {RouteComponentProps} from 'react-router-dom';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

// import {USER} from '../constant';
import {User} from '../services';
import {Line, Title} from '../ui';

import {Password} from './access/password';
import {UserName} from './access/username';

// interface TLoginProps extends RouteComponentProps {}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const ActionButton = styled(Button)`
  width: 100px;
`;

const LoginButton = styled(ActionButton)``;

const JumpLink = styled(Link)`
  cursor: pointer !important;
  margin-top: 10px !important;
` as ComponentType<LinkProps>;

const RegisterLink = styled(JumpLink)`
  margin-top: 40px !important;
` as ComponentType<LinkProps>;

const ActionButtonWrapper = styled.div`
  width: 300px;
  margin-top: 30px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LineWrapper = styled.div`
  width: 100%;
  height: 2px;
  margin-top: 30px;
`;

const LoginTitle = styled(Title)`
  padding-top: 30px !important;
`;

@observer
export class Login extends Component {
  @Inject
  private userService!: User;

  render(): ReactNode {
    return (
      <>
        <LoginTitle>登录</LoginTitle>
        <Wrapper>
          <UserName />
          <Password />
          <ActionButtonWrapper>
            <JumpLink>忘记密码啦？点我！</JumpLink>
            <LoginButton
              variant="contained"
              color="primary"
              onClick={async (): Promise<void> => {
                // this.handleLoginClick();
                try {
                  await this.userService.login('zzhbbdbbd', 'www');
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              登录
            </LoginButton>
          </ActionButtonWrapper>
          <LineWrapper>
            <Line></Line>
          </LineWrapper>
          <RegisterLink onClick={() => this.handleRegisterClick()}>
            没注册的点我立即注册
          </RegisterLink>
        </Wrapper>
      </>
    );
  }

  async handleLoginClick(): Promise<void> {
    // try {
    //   await this.userService.login('zzhbbdbbd', 'www');
    // } catch (e) {
    //   console.error(e);
    // }
  }

  handleRegisterClick(): void {
    // const {history} = this.props;
    // history.push(USER.REGISTER);
  }
}

// export const Login = withRouter(TLogin);
