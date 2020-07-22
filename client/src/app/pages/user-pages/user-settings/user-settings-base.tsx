import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {TextField, Button} from '@material-ui/core';
import {Inject} from '@wizardoc/injector';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import {SettingTitle} from 'src/app/components';
import {FormControl} from 'src/app/ui';
import {UserBaseInfo, User, Toast} from 'src/app/services';
import {objectShallowDiff} from 'src/app/utils';

interface TextFieldMetadata {
  label: string;
  name: string;
  description: string;
}

const Wrapper = styled.div``;

const InputContainer = styled.div``;

const Footer = styled.div`
  margin-top: 40px;
`;

const StyledTextField = styled(TextField)`
  margin-top: 15px !important;
`;

const textFieldData: TextFieldMetadata[] = [
  {
    label: '昵称',
    name: 'displayName',
    description: '昵称是您的对外展示的名称而不是登录用的用户名',
  },
  {
    label: '个人简介',
    name: 'intro',
    description: '一句话介绍自己，不超过 50 字',
  },
  {
    label: '真实姓名',
    name: 'realName',
    description: '填写您的真实姓名',
  },
  {
    label: '城市',
    name: 'city',
    description: '填写您所在的城市，例如：四川，成都',
  },
  {
    label: '公司名称',
    name: 'companyName',
    description: '填写您所在的公司名称',
  },
  {
    label: '公司头衔',
    name: 'companyTitle',
    description: '填写您在公司的头衔，比如：BUG 王',
  },
  {
    label: 'GitHub 地址',
    name: 'github',
    description: '您的 GitHub 地址',
  },
  {
    label: 'Blog 地址',
    name: 'blog',
    description: '您的博客地址',
  },
];

@observer
export class UserSettingsBase extends Component {
  @Inject
  user!: User;

  @Inject
  toast!: Toast;

  @observable
  formData: Partial<UserBaseInfo>;

  constructor(props: any) {
    super(props);

    this.formData = {...this.user.userInfo};
  }

  handleFormDataChange(data: Partial<UserBaseInfo>): void {
    this.formData = {...this.formData, ...data};
  }

  async handleSubmitClick(): Promise<void> {
    if (objectShallowDiff(this.user.userInfo, this.formData)) {
      this.toast.warning('抱歉，暂无更改');

      return;
    }

    const result = await this.user.updateUserInfo(this.formData);

    result.success(() => this.toast.success('更新成功'));
  }

  render(): ReactNode {
    const renderTextField = textFieldData.map(({name, label, description}) => (
      <StyledTextField
        fullWidth
        key={name}
        name={name}
        label={label}
        helperText={description}
        value={this.formData[name]}
      />
    ));

    return (
      <Wrapper>
        <SettingTitle>个人信息</SettingTitle>
        <InputContainer>
          <FormControl
            onFormDataChange={data => this.handleFormDataChange(data)}
          >
            {renderTextField}
          </FormControl>
        </InputContainer>
        <Footer>
          <Button
            onClick={() => this.handleSubmitClick()}
            variant="contained"
            color="primary"
          >
            提交更新
          </Button>
        </Footer>
      </Wrapper>
    );
  }
}
