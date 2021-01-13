import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Alert, Color} from '@material-ui/lab';
import {Inject} from '@wizardoc/injector';
import {Button} from '@material-ui/core';
import {observer} from 'mobx-react';

import {
  SettingTitle,
  ValidEmailDialog,
  UpdateEmail,
  SettingSubTitle,
} from 'website/components';
import {User, DialogService} from 'website/services';

const Wrapper = styled.div``;

const EmailStatus = styled(Alert)`
  margin-top: 15px;
`;

const HelperText = styled.div`
  font-size: 12px;
`;

const UpdatePlace = styled.div`
  margin-top: 25px;
`;

const WarnText = styled.div`
  color: ${props => props.theme.warnYellow};
  font-size: 13px;
`;

@observer
export class UserSettingsEmail extends Component {
  @Inject
  user!: User;

  @Inject
  dialogService!: DialogService;

  handleValidEmailClick(): void {
    this.dialogService.open(ValidEmailDialog, {
      title: '验证邮箱',
      isClickAwayClose: true,
      componentProps: {
        email: this.user.userInfo.email,
      },
    });
  }

  get validSeverity(): Color {
    return this.user.userInfo.isValidEmail ? 'success' : 'warning';
  }

  render(): ReactNode {
    const {email, isValidEmail} = this.user.userInfo;

    return (
      <Wrapper>
        <SettingTitle>邮箱设置</SettingTitle>
        <EmailStatus
          severity={this.validSeverity}
          action={
            isValidEmail ? (
              <span>已验证</span>
            ) : (
              <Button
                onClick={() => this.handleValidEmailClick()}
                color="inherit"
                size="small"
              >
                去验证
              </Button>
            )
          }
        >
          当前邮箱：{email}
          {!isValidEmail && <HelperText>当前邮箱还未验证</HelperText>}
        </EmailStatus>
        <UpdatePlace>
          <SettingSubTitle>设置新邮箱</SettingSubTitle>
          {!this.user.userInfo.isValidEmail && (
            <WarnText>请先验证已有邮箱，才能更换邮箱</WarnText>
          )}
          <UpdateEmail />
        </UpdatePlace>
      </Wrapper>
    );
  }
}
