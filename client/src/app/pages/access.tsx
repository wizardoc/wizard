import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {Register} from '../components';

const RegisterBox = styled.div`
  width: 500px;
  height: fit-content;
  background: #fff;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  height: calc(100% - 60px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export class RegisterPage extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <RegisterBox>
          <Register />
        </RegisterBox>
      </Wrapper>
    );
  }
}
