import React, {Component, ReactNode, ChangeEvent} from 'react';
import {Card, TextField, Button} from '@material-ui/core';
import styled from 'styled-components';
import {Inject} from 'react-ts-di';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import {
  OrganizationCardData,
  OrganizationService,
  Toast,
} from 'src/app/services';

import {SubTitle, Group} from '../@common';

const Wrapper = styled(Card)`
  padding: 20px;
`;

const StyledTextField = styled(TextField)`
  width: 250px;
`;

const RenameButton = styled(Button)`
  margin-left: 10px !important;
`;

interface BaseEditCardProps {
  organizationInfo: OrganizationCardData;
}

@observer
export class BaseEditCard extends Component<BaseEditCardProps> {
  @Inject
  organizationService!: OrganizationService;

  @Inject
  toast!: Toast;

  @observable
  organizeName: string;

  @observable
  description: string;

  constructor(props: BaseEditCardProps) {
    super(props);

    const {
      organizationInfo: {organizeName, description},
    } = this.props;

    this.description = description;
    this.organizeName = organizeName;
  }

  async edit<T extends keyof OrganizationCardData>(
    fieldName: T,
    val: string,
  ): Promise<void> {
    const {
      organizationInfo: {id},
    } = this.props;
    const result = await this.organizationService.edit(id, {[fieldName]: val});

    result.success(() => {
      this.toast.success('更新成功！');
    });
  }

  render(): ReactNode {
    return (
      <Wrapper {...this.props}>
        <SubTitle>组织名称</SubTitle>
        <Group>
          <StyledTextField
            variant="outlined"
            size="small"
            label="重命名组织名称"
            value={this.organizeName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              (this.organizeName = e.target.value)
            }
          />
          <RenameButton
            variant="contained"
            color="primary"
            onClick={() => this.edit('organizeName', this.organizeName)}
          >
            重命名
          </RenameButton>
        </Group>
        <SubTitle>组织描述</SubTitle>
        <Group>
          <StyledTextField
            variant="outlined"
            size="small"
            label="重新编写组织描述"
            value={this.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              (this.description = e.target.value)
            }
          />
          <RenameButton
            variant="contained"
            color="primary"
            onClick={() => this.edit('description', this.description)}
          >
            重新编写
          </RenameButton>
        </Group>
      </Wrapper>
    );
  }
}
