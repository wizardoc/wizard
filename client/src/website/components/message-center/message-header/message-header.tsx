import React, {Component, ReactNode, ComponentType} from 'react';
import styled from 'styled-components';
import {Button, ButtonProps} from '@material-ui/core';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import {Inject} from '@wizardoc/injector';

import {Search} from 'website/ui';
import {DialogService} from 'website/services';

import {SendMessageDialog} from './@send-message-dialog';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledSearch = styled(Search)`
  height: 35px;
`;

const FuncBanner = styled.div`
  width: 100%;
  padding: 40px 0;
`;

const BaseButton = styled(Button)`
  width: 140px !important;
  border-radius: 10000px !important;
` as ComponentType<ButtonProps>;

const SendMessage = styled(BaseButton)`` as ComponentType<ButtonProps>;

const Trash = styled(BaseButton)`
  margin-left: 20px !important;
  background: ${props => props.theme.white} !important;
  color: ${props => props.theme.primaryColor} !important;
` as ComponentType<ButtonProps>;

export class MessageHeader extends Component {
  @Inject
  dialogService!: DialogService;

  render(): ReactNode {
    return (
      <Wrapper>
        <FuncBanner>
          <SendMessage
            onClick={() => this.handleSendMessageClick()}
            variant="contained"
            color="primary"
          >
            发送消息
          </SendMessage>
          <Trash variant="contained">
            <RestoreFromTrashIcon></RestoreFromTrashIcon>
            垃圾篓
          </Trash>
        </FuncBanner>
        <StyledSearch
          placeholder="搜索消息"
          onSearch={content => this.handleSearchClick(content)}
        />
      </Wrapper>
    );
  }

  handleSendMessageClick(): void {
    this.dialogService.open(SendMessageDialog, {
      title: '发送消息',
      isClickAwayClose: true,
    });
  }

  handleSearchClick(_content: string): void {}
}
