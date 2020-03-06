import React, {Component, ReactNode, ComponentType} from 'react';
import styled from 'styled-components';
import {Typography, Button, ButtonProps} from '@material-ui/core';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

import {Search} from 'src/app/ui';

const Wrapper = styled.div``;

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const Title = styled(Typography)`
  color: ${props => props.theme.titleColor};
  margin-right: 15px !important;
  white-space: pre;
  font-size: 20px !important;
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
  render(): ReactNode {
    return (
      <Wrapper>
        <SearchWrapper>
          <Title>Message Center</Title>
          <Search
            placeholder="搜索消息"
            onSearch={(content: string) => this.handleSearchClick(content)}
          />
        </SearchWrapper>
        <FuncBanner>
          <SendMessage variant="contained" color="primary">
            发送消息
          </SendMessage>
          <Trash variant="contained">
            <RestoreFromTrashIcon></RestoreFromTrashIcon>
            垃圾篓
          </Trash>
        </FuncBanner>
      </Wrapper>
    );
  }

  handleSearchClick(_content: string): void {}
}
