import {Button, Link} from '@material-ui/core';
import {LinkProps} from '@material-ui/core/Link';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
// import {RouteComponentProps} from 'react-router-dom';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

// import {USER} from '../constant';
import {MAIN_PAGE} from '../constant';
import {Toast, User} from '../services';
import {FormControl, Line, Rules, Title} from '../ui';

import {Password} from './access/password';
import {UserName} from './access/username';

// interface TLoginProps extends RouteComponentProps {}

interface FormData {
  username: string;
  password: string;
}

interface LoginProps {}

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
export class TLogin extends Component<LoginProps & RouteComponentProps> {
  @Inject
  private userService!: User;

  @Inject
  private toast!: Toast;

  @observable
  private formData: FormData | undefined;

  private rules: Rules = {
    username: {
      required: true,
      errMsg: 'hello man',
      validator: (_rule, value, cb) => {
        if (value === '123') {
          cb('hello');
        }
      },
    },
  };

  render(): ReactNode {
    return (
      <>
        <LoginTitle>登录</LoginTitle>
        <Wrapper>
          <FormControl
            onFormDataChange={(formData: unknown) => {
              this.formData = formData as FormData;
            }}
            rules={this.rules}
          >
            <UserName name="username" />
            <Password name="password" />
          </FormControl>
          <ActionButtonWrapper>
            <JumpLink>忘记密码啦？点我！</JumpLink>
            <LoginButton
              variant="contained"
              color="primary"
              onClick={() => this.handleLoginClick()}
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
    if (!this.formData) {
      return;
    }

    const {history} = this.props;
    const {username, password} = this.formData;

    try {
      await this.userService.login(username, password);
    } catch (e) {
      console.error(e);
      return;
    }

    this.toast.success('登录成功');
    history.replace(MAIN_PAGE.ROOT);
  }

  handleRegisterClick(): void {
    // const {history} = this.props;
    // history.push(USER.REGISTER);
  }
}

export const Login = withRouter(TLogin);
