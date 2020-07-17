import {Typography} from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {Inject} from '@wizardoc/injector';
import styled from 'styled-components';

import {DialogService, Toast, User} from '../../../services';
import {Avatar, ImageUpload} from '../../common';

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
  dialogService!: DialogService;

  @Inject
  userService!: User;

  @observable
  isAvatarHover = false;

  handleAvatarMouseHover(): void {
    this.isAvatarHover = true;
  }

  handleAvatarMouseLeave(): void {
    this.isAvatarHover = false;
  }

  async handleUploadAfterRead(file: File): Promise<void> {
    const dialogRef = await this.dialogService.open(AvatarSelector, {
      title: '选择头像',
      componentProps: {file},
    });

    dialogRef.onClose((data: unknown) => {
      console.info(data);
    });
  }

  render(): ReactNode {
    const {username, avatar} = this.userService.userInfo!;

    return (
      <ImageUpload onAfterRead={file => this.handleUploadAfterRead(file)}>
        <Wrapper
          onMouseLeave={() => this.handleAvatarMouseLeave()}
          onMouseOver={() => this.handleAvatarMouseHover()}
        >
          <AvatarBigger username={username} lnk={avatar} />
          <EditTag hover={this.isAvatarHover}>
            <BarWrapper>
              <InsertPhotoIcon></InsertPhotoIcon>
              &nbsp;|&nbsp;
              <InsertEmoticonIcon></InsertEmoticonIcon>
            </BarWrapper>
            {this.isAvatarHover && <Typography>更换头像</Typography>}
          </EditTag>
        </Wrapper>
      </ImageUpload>
    );
  }
}
