import React, {Component, ReactNode, createRef} from 'react';
import styled from 'styled-components';
import {TextField} from '@material-ui/core';
import {Category} from '@wizardoc/shared';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {Inject} from '@wizardoc/injector';

import {
  DialogComponentProps,
  ActionDialog,
  ParsedActionButtons,
  DialogService,
  UploadService,
  CategoryService,
} from 'src/app/services';
import {FormControl, Rules} from 'src/app/ui';
import {objectShallowDiff} from 'src/app/utils';

import {CategoryCoverUpload} from './@category-cover-upload';
import {CategoryCard} from './category-card';

export interface CreateCategoryDialogProps {
  organizationID: string;
}

interface CategoryData {
  name: string;
  description: string;
  cover: string;
}

interface PreviewProps {
  isSpread: boolean;
}

const EditWrapper = styled.div``;

const PreviewWrapper = styled.div<PreviewProps>`
  transform: translateX(30px);
  width: ${props => (props.isSpread ? 300 : 0)}px;

  transition: all 0.5s;
`;

const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  padding-bottom: 1px;
`;

const CategoryTextField = styled(TextField)`
  width: 250px;
`;

@observer
export class CreateCategoryDialog
  extends Component<CreateCategoryDialogProps & Partial<DialogComponentProps>>
  implements ActionDialog {
  @Inject
  dialogService!: DialogService;

  @Inject
  uploadService!: UploadService;

  @Inject
  categoryService!: CategoryService;

  private formControlRef = createRef<FormControl>();

  private readonly rules: Rules = {
    name: {required: true, errMsg: '分类名称不能为空'},
    description: {required: true, errMsg: '分类描述不能为空'},
    cover: {required: true, errMsg: '封面不能为空'},
  };

  private readonly defaultCategoryInfo: Category = {
    name: '',
    description: '',
    cover: '',
    createTime: 0,
    id: '',
    lastModifyTime: 0,
    organizationID: '',
    createUser: '',
  };

  @observable
  private editCategoryInfo: Category = {...this.defaultCategoryInfo};

  @observable
  isSpreadPreview = false;

  coverFile: File | undefined;

  get isShallowInfoDiff(): boolean {
    return objectShallowDiff(this.editCategoryInfo, this.defaultCategoryInfo);
  }

  actionButtons(): ParsedActionButtons[] {
    return [
      {
        text: '确认',
        props: {color: 'primary'},
        cb: () => this.handleSubmitClick(),
      },
    ];
  }

  async handleSubmitClick(): Promise<void> {
    if (!this.formControlRef.current?.validate()) {
      return;
    }

    await this.dialogService.loading(async () => {
      const {url} = await this.uploadService.upload(this.coverFile!);

      this.editCategoryInfo.cover = url;

      await this.categoryService.createCategory(this.editCategoryInfo);
    });

    this.props.close!();
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <EditWrapper>
          <FormControl
            ref={this.formControlRef}
            rules={this.rules}
            onFormDataChange={data => this.handleFormDataChange(data)}
          >
            <CategoryCoverUpload
              name="cover"
              onChange={(_, file) => (this.coverFile = file)}
            />
            <CategoryTextField
              required
              name="name"
              label="名称"
              type="text"
              autoComplete="new-password"
              placeholder="输入分类的昵称"
              inputProps={{
                maxLength: 15,
              }}
            />
            <CategoryTextField
              required
              name="description"
              label="描述"
              type="text"
              autoComplete="new-password"
              placeholder="输入分类的描述（50字以内）"
              inputProps={{
                maxLength: 50,
              }}
            />
          </FormControl>
        </EditWrapper>
        <PreviewWrapper isSpread={this.isSpreadPreview}>
          <CategoryCard info={this.editCategoryInfo}></CategoryCard>
        </PreviewWrapper>
      </Wrapper>
    );
  }

  handleFormDataChange(data: CategoryData): void {
    this.editCategoryInfo = {
      ...this.editCategoryInfo,
      ...data,
      organizationID: this.props.organizationID,
    };

    this.isSpreadPreview = this.isShallowInfoDiff;
  }
}
