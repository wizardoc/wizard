import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {TextField, Button} from '@material-ui/core';
import {observable} from 'mobx';
import {Inject} from '@wizardoc/injector';

import {SettingTitle} from 'src/app/components';
import {FormControl, Rules} from 'src/app/ui';
import {ConfirmDialogService, User, Toast} from 'src/app/services';

interface FormData {
  originPassword: string;
  newPassword: string;
  ensureNewPassword: string;
}

const Wrapper = styled.div``;

const UpdateWrapper = styled.div`
  margin-bottom: 35px;
`;

const StyledTextField = styled(TextField)`
  margin-top: 15px !important;
  width: 350px !important;
`;

const DEFAULT_FORM_DATA: FormData = {
  originPassword: '',
  newPassword: '',
  ensureNewPassword: '',
};

@observer
export class UserSettingsPassword extends Component {
  @Inject
  confirmDialog!: ConfirmDialogService;

  @Inject
  user!: User;

  @Inject
  toast!: Toast;

  @observable
  formData: FormData = DEFAULT_FORM_DATA;

  formControlRules: Rules = {
    originPassword: {
      required: true,
      errMsg: '原密码不能为空',
    },
    newPassword: {
      required: true,
      errMsg: '新密码不能为空',
      validator: (_, value, cb) => {
        if (this.formData.originPassword === value) {
          cb('不能和原密码相同');

          return;
        }
      },
    },
    ensureNewPassword: {
      required: true,
      errMsg: '请确认新密码',
      validator: (_, value, cb) => {
        if (value !== this.formData.newPassword) {
          cb('两次输入密码不一致');

          return;
        }
      },
    },
  };

  handleFormDataChange(data: FormData): void {
    this.formData = data;
  }

  handleUpdatePasswordClick(): void {
    this.confirmDialog.confirm({
      content: '确认要修改吗？',
      onSureClick: async () => {
        const {originPassword, newPassword} = this.formData;
        const result = await this.user.updatePassword(
          originPassword,
          newPassword,
        );

        result.success(() => {
          this.toast.success('修改密码成功！');
        });
      },
    });
  }

  render(): ReactNode {
    const {originPassword, ensureNewPassword, newPassword} = this.formData;

    return (
      <Wrapper>
        <SettingTitle>更改密码</SettingTitle>
        <UpdateWrapper>
          <FormControl
            rules={this.formControlRules}
            onFormDataChange={data => this.handleFormDataChange(data)}
          >
            <StyledTextField
              type="password"
              value={originPassword}
              size="small"
              label="原密码"
              name="originPassword"
            />
            <StyledTextField
              type="password"
              value={newPassword}
              size="small"
              label="新密码"
              name="newPassword"
            />
            <StyledTextField
              type="password"
              value={ensureNewPassword}
              size="small"
              label="确认新密码"
              name="ensureNewPassword"
            />
          </FormControl>
        </UpdateWrapper>
        <Button
          onClick={() => this.handleUpdatePasswordClick()}
          variant="contained"
          color="primary"
        >
          确认更改
        </Button>
      </Wrapper>
    );
  }

  private clear(): void {
    this.formData = DEFAULT_FORM_DATA;
  }
}
