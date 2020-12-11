import React, {Component, ReactNode, createRef} from 'react';
import styled from 'styled-components';
import {TextField, Button} from '@material-ui/core';
import {Inject} from '@wizardoc/injector';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import {FormControl, FormItemProps, Rules} from 'website/ui';
import {SettingTitle, SendVerifyCodeButton} from 'website/components';
import {User, Toast} from 'website/services';

interface FormData {
  email: string;
  code: string;
  newPassword: string;
  sureNewPassword: string;
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background: ${props => props.theme.flatGray};
`;

const Wrapper = styled.div`
  width: 390px;
  height: fit-content;
  padding: 30px;
  margin-top: 150px;
  background: ${props => props.theme.white};
  box-shadow: ${props => props.theme.flatShadow};
`;

const Form = styled.div`
  margin-top: 20px;
`;

const VerifyBlock = styled.div<FormItemProps>`
  display: flex;
  align-items: baseline;
`;

const StyledSendVerifyCodeButton = styled(SendVerifyCodeButton)`
  flex-shrink: 0 !important;
`;

const StyledSubmitButton = styled(Button)`
  width: 100%;
  margin-top: 20px !important;
`;

@observer
export class ResetPassword extends Component {
  @Inject
  user!: User;

  @Inject
  toast!: Toast;

  @observable
  formData: FormData = {
    email: '',
    code: '',
    newPassword: '',
    sureNewPassword: '',
  };

  formControlRef = createRef<FormControl>();

  rules: Rules = {
    email: {
      required: true,
      errMsg: '邮箱不能为空',
    },
    code: {
      required: true,
      errMsg: '验证码不能为空',
    },
    newPassword: {
      required: true,
      errMsg: '新密码不能为空',
    },
    sureNewPassword: {
      required: true,
      errMsg: '请确认新密码',
    },
  };

  handleFormDataChange(data: FormData): void {
    this.formData = data;
  }

  async handleSubmitClick(): Promise<void> {
    if (!this.formControlRef.current?.validate()) {
      return;
    }

    const {email, code, newPassword} = this.formData;
    const result = await this.user.resetPassword(email, code, newPassword);

    result.success(() => {
      this.toast.success('重置密码成功');
    });
  }

  async handleSendVerifyCodeClick(): Promise<void> {
    if (!this.formControlRef.current?.validateField('email')) {
      return;
    }

    const result = await this.user.sendEmailVerifyCode(this.formData.email);

    result.success(() => {
      this.toast.success('发送验证码成功！请注意查收邮件');
    });
  }

  render(): ReactNode {
    return (
      <Container>
        <Wrapper>
          <SettingTitle>忘记密码</SettingTitle>
          <Form>
            <FormControl
              onFormDataChange={data => this.handleFormDataChange(data)}
              ref={this.formControlRef}
            >
              <TextField
                name="email"
                label="邮箱"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <VerifyBlock name="code">
                <TextField
                  name="code"
                  label="验证码"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <StyledSendVerifyCodeButton
                  buttonProps={{
                    disabled: this.formData.email === '',
                  }}
                  onClick={() => this.handleSendVerifyCodeClick()}
                >
                  发送验证码
                </StyledSendVerifyCodeButton>
              </VerifyBlock>
              <TextField
                name="newPassword"
                label="新密码"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                name="sureNewPassword"
                label="确认新密码"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Form>
          <StyledSubmitButton
            onClick={() => this.handleSubmitClick()}
            variant="contained"
            color="primary"
          >
            确认提交
          </StyledSubmitButton>
        </Wrapper>
      </Container>
    );
  }
}
