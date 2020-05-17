import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {Button, ListItem, List} from '@material-ui/core';
import {Inject} from 'react-ts-di';

import {SearchNameResult, ConfirmDialogService} from 'src/app/services';
import {Default} from 'src/app/components/common';

export interface InviteSearchBoxProps {
  searchResult: SearchNameResult;
  organizeName: string;
}

const Wrapper = styled.div`
  padding: 12px;
  background: ${props => props.theme.flatGray};
  margin: 50px 0 20px 0;
  border-radius: 10px;
`;

const SearchItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

const UserName = styled.div``;

const StyledList = styled(List)`
  background: ${props => props.theme.white};
`;

const DefaultView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0;
  color: ${props => props.theme.grayTextColor};
`;

@observer
export class InviteSearchBox extends Component<InviteSearchBoxProps> {
  @Inject
  confirmDialogService!: ConfirmDialogService;

  handleInviteClick(username: string): void {
    this.confirmDialogService.confirm({
      content: `确定要邀请 ${username} 进入 ${this.props.organizeName} 吗`,
      title: '邀请提醒',
      onSureClick: () => {},
    });
  }

  render(): ReactNode {
    const {searchResult} = this.props;
    const searchUsers = searchResult.map(({username}) => (
      <>
        <ListItem button>
          <SearchItem>
            <UserName>{username}</UserName>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleInviteClick(username)}
            >
              邀请
            </Button>
          </SearchItem>
        </ListItem>
      </>
    ));

    return (
      <Wrapper>
        <Default
          condition={() => !searchResult.length}
          defaultView={<DefaultView>暂无搜索结果</DefaultView>}
        >
          <StyledList>{searchUsers}</StyledList>
        </Default>
      </Wrapper>
    );
  }
}
