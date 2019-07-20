import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {Register} from '../components';

import {AccessBox, Wrapper} from './common-style-component/access-wrapper';

const RegisterBox = styled(AccessBox)``;

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
