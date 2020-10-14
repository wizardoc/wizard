import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {UserSearchLine} from './user-search-line';

const Wrapper = styled.div``;

const StyledUserSearchLine = styled(UserSearchLine)`
  width: 100%;
`;

export class InviteMemberBox extends Component {
  render(): ReactNode {
    return (
      <Wrapper {...this.props}>
        <StyledUserSearchLine
          placeholder="请输入需要邀请的组织成员"
          helperText="输入用户的用户名，按回车键进行查找"
        />
      </Wrapper>
    );
  }
}
