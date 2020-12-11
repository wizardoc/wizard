import {Button} from '@material-ui/core';
import {LinkProps} from '@material-ui/core/Link';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode, createRef} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
// import {RouteComponentProps} from 'react-router-dom';
import {Inject} from '@wizardoc/injector';
import styled from 'styled-components';

// import {USER} from '../constant';3ew
import {WithSlideProps} from '../animations';
import {Toast, User} from '../services';
import {A, FormControl, Line, Rules, Title} from '../ui';

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

const JumpLink = styled(A)`
  margin-top: 10px !important;
` as ComponentType<LinkProps>;

const RegisterLink = styled(JumpLink)`
  margin-top: 40px !important;
` as ComponentType<any>;

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
export class TLogin extends Component<
  LoginProps & RouteComponentProps & WithSlideProps
> {
  @Inject
  private userService!: User;

  @Inject
  private toast!: Toast;

  @observable
  private formData: FormData | undefined;

  private formControlRef = createRef<FormControl>();

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
    password: {
      required: true,
    },
  };

  render(): ReactNode {
    return (
      <>
        <LoginTitle>登录</LoginTitle>
        <Wrapper>
          <FormControl
            ref={this.formControlRef}
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

  validate(): boolean {
    return this.formControlRef.current!.validate();
  }

  async handleLoginClick(): Promise<void> {
    if (!this.validate()) {
      return;
    }

    if (!this.formData) {
      return;
    }

    const {history} = this.props;
    const {username, password} = this.formData;
    const ok = await this.userService.login(username, password);

    if (!ok) {
      return;
    }

    this.toast.success('登录成功');
    history.replace('/');
  }

  handleRegisterClick(): void {
    const {history, exitAnimation} = this.props;

    exitAnimation(() => history.push('/user/register'));
  }
}

export const Login = withRouter(TLogin);
