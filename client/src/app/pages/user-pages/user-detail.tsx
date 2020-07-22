import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {UserCard} from 'src/app/components';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${props => props.theme.flatGray};
  display: flex;
  justify-content: center;
`;

export class UserDetailPage extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <UserCard></UserCard>
      </Wrapper>
    );
  }
}
