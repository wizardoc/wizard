import React, {Component, ReactNode, ChangeEvent} from 'react';
import styled from 'styled-components';
import {TextField, Button} from '@material-ui/core';
import {Inject} from '@wizardoc/injector';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import {
  ActionDialog,
  DialogComponentProps,
  ParsedActionButtons,
  User,
  Toast,
  Time,
  UserBaseInfo,
} from 'website/services';

import {SendVerifyCodeButton} from '../common';

export interface ValidEmailDialogProps {
  email: string;
}

const Wrapper = styled.div``;

@observer
export class ValidEmailDialog
  extends Component<DialogComponentProps & ValidEmailDialogProps>
  implements ActionDialog {
  @Inject
  user!: User;

  @Inject
  toast!: Toast;

  @Inject
  time!: Time;

  verifyCode: string = '';

  actionButtons(): ParsedActionButtons[] {
    return [
      {
        text: '验证',
        cb: () => this.handleValidEmail(),
        props: {color: 'primary'},
      },
    ];
  }

  async handleValidEmail(): Promise<void> {
    if (this.verifyCode === '') {
      this.toast.error('验证码不能为空');

      return;
    }

    const {email, close} = this.props;
    const result = await this.user.verifyEmail(email, this.verifyCode);

    result.success((user: UserBaseInfo) => {
      this.user.setUserInfo(user);

      this.toast.success('验证成功！');
      close();
    });
  }

  async handleSendVerifyCodeClick(): Promise<void> {
    const result = await this.user.sendEmailVerifyCode(this.props.email);

    result.success(() => {
      this.toast.success('验证码已发送！请留意邮件哦！');
    });
  }

  handleVerifyCodeChange(e: ChangeEvent<HTMLInputElement>): void {
    this.verifyCode = e.target.value;
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <TextField
          label="验证码"
          size="small"
          helperText="我们会发送一封含有验证码的邮件，请注意查收"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            this.handleVerifyCodeChange(e)
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
        <SendVerifyCodeButton onClick={() => this.handleSendVerifyCodeClick()}>
          发送验证码
        </SendVerifyCodeButton>
      </Wrapper>
    );
  }
}
