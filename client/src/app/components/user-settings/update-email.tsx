import React, {Component, ReactNode, ChangeEvent, createRef} from 'react';
import styled from 'styled-components';
import {TextField, Button} from '@material-ui/core';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {Inject} from '@wizardoc/injector';

import {FormControl, FormItemProps, Rules} from 'src/app/ui';
import {User, Toast, UserBaseInfo, RegexUtils} from 'src/app/services';

import {SendVerifyCodeButton} from '../common';

interface FormData {
  email: string;
  code: string;
}

const Wrapper = styled.div``;

const VerifyBlock = styled.div<FormItemProps>`
  display: flex;
  align-items: baseline;
`;

const StyledTextField = styled(TextField)`
  width: 300px !important;
  margin-top: 15px !important;
`;

const Footer = styled.div`
  margin-top: 30px;
`;

@observer
export class UpdateEmail extends Component {
  get isDisabled(): boolean {
    return !this.user.userInfo.isValidEmail;
  }

  @observable
  formData: FormData = {email: '', code: ''};

  @Inject
  user!: User;

  @Inject
  toast!: Toast;

  @Inject
  regexUtils!: RegexUtils;

  formControlRef = createRef<FormControl>();

  formControlRules: Rules = {
    email: {
      required: true,
      errMsg: '邮箱不能为空',
      validator: (_, email, cb) => {
        if (email === this.user.userInfo.email) {
          cb('邮箱不能和之前填写的邮箱一致');

          return;
        }

        if (!this.regexUtils.validEmail(email)) {
          cb('请输入正确的邮箱');

          return;
        }
      },
    },
    code: {
      required: true,
      errMsg: '验证码不能空',
    },
  };

  handleFormDataChange(formData: FormData): void {
    this.formData = formData;
  }

  async handleUpdateEmailClick(): Promise<void> {
    if (!this.formControlRef.current?.validate()) {
      return;
    }

    const {code, email} = this.formData;

    const result = await this.user.updateEmail(email, code);

    result.success((user: UserBaseInfo) => {
      this.toast.success('更新成功');
      this.user.setUserInfo(user);
      this.clear();
    });
  }

  async handleSendEmailCodeClick(): Promise<void> {
    if (!this.formControlRef.current?.validateField('email')) {
      this.toast.error('请先输入邮箱哦～');
      return;
    }

    const result = await this.user.sendEmailVerifyCode(this.formData.email);

    result.success(() => {
      this.toast.success('验证码已发送！请留意邮件哦！');
    });
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <FormControl
          rules={this.formControlRules}
          ref={this.formControlRef}
          onFormDataChange={formData => this.handleFormDataChange(formData)}
        >
          <StyledTextField
            value={this.formData.email}
            name="email"
            disabled={this.isDisabled}
            label="新邮箱"
            size="small"
          />
          <VerifyBlock name="code">
            <StyledTextField
              value={this.formData.code}
              type="number"
              disabled={this.isDisabled}
              label="验证码"
              size="small"
            />
            <SendVerifyCodeButton
              onClick={() => this.handleSendEmailCodeClick()}
              buttonProps={{
                disabled: this.isDisabled || this.formData.email === '',
              }}
            >
              发送验证码
            </SendVerifyCodeButton>
          </VerifyBlock>
        </FormControl>
        <Footer>
          <Button
            disabled={this.isDisabled}
            color="primary"
            variant="contained"
            onClick={() => this.handleUpdateEmailClick()}
          >
            更新邮箱
          </Button>
        </Footer>
      </Wrapper>
    );
  }

  private clear(): void {
    this.formData = {email: '', code: ''};
  }
}
