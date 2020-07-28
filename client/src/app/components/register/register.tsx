import {observable} from 'mobx';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode, createRef} from 'react';
import {Inject} from '@wizardoc/injector';
import {Button} from '@material-ui/core';

import {WithSlideProps} from '../../animations';
import {
  DialogService,
  Toast,
  User,
  RegexUtils,
  RegisterData,
} from '../../services';
import {
  A,
  Title,
  Form,
  FormControl,
  FormTextField,
  FormTextFieldProps,
  Rules,
} from '../../ui';
import {Password} from '../access/password';
import {UserName} from '../access/username';

export interface FormBodyProps {
  index: number;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 30px;
  flex-direction: column;
  transition: 0.3s height;
`;

const TitleWrapper = styled.div`
  width: 100%;
`;

export const TextFieldWrapper = styled(FormTextField)`
  width: 300px;
  margin: 0 50px;
` as ComponentType<FormTextFieldProps>;

const RegisterButton = styled(Button)`
  width: 100px;
  height: 36px;
`;

const Footer = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

@withRouter
@observer
export class Register extends Component<
  WithSlideProps & Partial<RouteComponentProps>
> {
  @observable
  private registerData: RegisterData | undefined;

  @Inject
  private regexUtils!: RegexUtils;

  @Inject
  private userService!: User;

  @Inject
  private toast!: Toast;

  private formControlRef = createRef<FormControl>();

  get rules(): Rules {
    return {
      displayName: {
        errMsg: '昵称不能为空',
        required: true,
        validator: Form.Validators.minLengthValidator(2, '昵称'),
      },
      username: {
        errMsg: '用户名不能为空',
        required: true,
        validator: Form.Validators.minLengthValidator(4, '用户名'),
      },
      password: {
        errMsg: '密码不能为空',
        required: true,
        validator: Form.Validators.minLengthValidator(4, '密码'),
      },
      email: {
        errMsg: '邮箱不能为空',
        required: true,
        validator: (_rule, text, cb) => {
          if (!this.regexUtils.validEmail(text)) {
            cb('请输入正确的邮箱格式');
          }
        },
      },
    };
  }

  handleLoginClick(): void {
    const {history, exitAnimation} = this.props;

    exitAnimation(() => history!.push('/user/login'));
  }

  handleRegisterClick(): void {
    if (!this.formControlRef.current?.validate()) {
      return;
    }

    this.userService.register(this.registerData!);
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <TitleWrapper>
          <Title>注册</Title>
        </TitleWrapper>
        <FormControl
          ref={this.formControlRef}
          rules={this.rules}
          onFormDataChange={(data: RegisterData) => (this.registerData = data)}
        >
          <TextFieldWrapper
            name="displayName"
            label="昵称"
            type="text"
            autoComplete="new-password"
            placeholder="输入用于显示的昵称"
            inputProps={{
              maxLength: 10,
            }}
          />
          <UserName
            name="username"
            inputProps={{
              maxLength: 20,
            }}
          />
          <Password
            name="password"
            inputProps={{
              maxLength: 20,
            }}
          />
          <TextFieldWrapper
            name="email"
            label="邮箱"
            type="email"
            placeholder="接收变更通知的邮箱"
            autoComplete="new-password"
          />
        </FormControl>
        <Footer>
          <A onClick={() => this.handleLoginClick()}>已有账号？立即登录！</A>
          <RegisterButton
            variant="contained"
            color="primary"
            onClick={() => this.handleRegisterClick()}
          >
            注册
          </RegisterButton>
        </Footer>
      </Wrapper>
    );
  }
}
