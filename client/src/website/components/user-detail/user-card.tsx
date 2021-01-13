import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {Avatar} from '../common';

const Wrapper = styled.div`
  width: 600px;
  height: 200px;
  background: ${props => props.theme.white};
  box-shadow: ${props => props.theme.flatShadow};
  margin-top: 100px;
  border-radius: 3px;
`;

const UserContainer = styled.div``;

const InfoContainer = styled.div``;

const Funcs = styled.div``;

export class UserCard extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <UserContainer>
          <Avatar />
          <InfoContainer />
        </UserContainer>
        <Funcs />
      </Wrapper>
    );
  }
}
