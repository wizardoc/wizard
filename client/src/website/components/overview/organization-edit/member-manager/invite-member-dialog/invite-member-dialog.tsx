import React, {Component, ReactNode, ChangeEvent, KeyboardEvent} from 'react';
import styled from 'styled-components';
import {TextField, Button} from '@material-ui/core';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {Inject} from '@wizardoc/injector';
import {KEY_ENTER, KEY_RETURN} from 'keycode-js';

import {User, SearchNameResult} from 'website/services';

import {InviteSearchBox} from './invite-search-box';

const Wrapper = styled.div``;

const StyledTextField = styled(TextField)`
  width: 300px;
  margin-right: 10px !important;
`;

const SearchHeader = styled.div`
  display: flex;
  align-items: flex-end;
`;

export interface InviteMemberDialogProps {
  organizeName: string;
}

@observer
export class InviteMemberDialog extends Component<InviteMemberDialogProps> {
  @Inject
  user!: User;

  @observable
  searchValue: string = '';

  @observable
  searchUsers: SearchNameResult = [];

  async handleSearchName(): Promise<void> {
    this.searchUsers = await this.user.searchByName(this.searchValue);
  }

  handleSearchInputKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
    if ([KEY_ENTER, KEY_RETURN].includes(+e.key)) {
      this.handleSearchName();
    }
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <SearchHeader>
          <StyledTextField
            label="邀请用户名"
            value={this.searchValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              (this.searchValue = e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              this.handleSearchInputKeyDown(e)
            }
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.handleSearchName()}
          >
            搜索
          </Button>
        </SearchHeader>
        <InviteSearchBox
          searchResult={this.searchUsers}
          organizeName={this.props.organizeName}
        />
      </Wrapper>
    );
  }
}
