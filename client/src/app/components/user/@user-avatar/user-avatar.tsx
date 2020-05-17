import {Typography} from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {DialogService, Toast, User, UploadService} from '../../../services';
import {Upload} from '../../../ui';
import {isImage} from '../../../utils';
import {Avatar} from '../../common';

import {AvatarSelector} from './avatar-selector';

interface EditTagProps {
  hover: boolean;
}

const Wrapper = styled.div`
  position: relative;
  border-radius: 1000px;
  overflow: hidden;
`;

const AvatarBigger = styled(Avatar)`
  width: 150px !important;
  height: 150px !important;
  cursor: pointer;
`;

const EditTag = styled.div<EditTagProps>`
  width: 100%;
  height: ${props => (props.hover ? '100%' : '50px')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
  position: absolute;
  transition: 0.3s all;
  bottom: 0;
  left: 0;
`;

const BarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

@observer
export class UserAvatar extends Component {
  @Inject
  toast!: Toast;

  @Inject
  userService!: User;

  @Inject
  dialogService!: DialogService;

  @Inject
  uploadService!: UploadService;

  @observable
  isAvatarHover = false;

  handleAvatarMouseHover(): void {
    this.isAvatarHover = true;
  }

  handleAvatarMouseLeave(): void {
    this.isAvatarHover = false;
  }

  async handleUploadAfterRead(file: File): Promise<void> {
    if (!file) {
      return;
    }

    if (!isImage(file.type)) {
      this.toast.error('请选择 png/jpg 的头像');
      return;
    }

    const dialogRef = await this.dialogService.open(AvatarSelector, {
      actionButtons: [
        {
          text: '取消',
        },
        {
          text: '确认',
          cb: () => this.handleSelectBoxClose(file),
          props: {
            color: 'primary',
          },
        },
      ],
      title: '选择头像',
      componentProps: {file},
    });

    dialogRef.onClose((data: unknown) => {
      console.info(data);
    });
  }

  render(): ReactNode {
    return (
      <Upload onAfterRead={(file: File) => this.handleUploadAfterRead(file)}>
        <Wrapper
          onMouseLeave={() => this.handleAvatarMouseLeave()}
          onMouseOver={() => this.handleAvatarMouseHover()}
        >
          <AvatarBigger></AvatarBigger>
          <EditTag hover={this.isAvatarHover}>
            <BarWrapper>
              <InsertPhotoIcon></InsertPhotoIcon>
              &nbsp;|&nbsp;
              <InsertEmoticonIcon></InsertEmoticonIcon>
            </BarWrapper>
            {this.isAvatarHover && <Typography>更换头像</Typography>}
          </EditTag>
        </Wrapper>
      </Upload>
    );
  }

  async handleSelectBoxClose(file: File): Promise<void> {
    try {
      const {url} = await this.uploadService.upload(file);

      await this.userService.updateAvatar(url);

      this.toast.success('上传成功！');
    } catch (e) {
      this.toast.error('上传失败');
    }
  }
}
