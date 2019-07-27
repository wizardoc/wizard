import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {Register} from '../components';

import {AccessBox, Wrapper} from './common-style-component/access-wrapper';

const RegisterBox = styled(AccessBox)``;

const TipCard = styled.div`
  width: 300px;
  height: 512px;
  background: ${props => props.theme.primaryColor};
  border-radius: 10px;
  margin-right: 20px;
`;

export class RegisterPage extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <TipCard></TipCard>
        <RegisterBox>
          <Register />
        </RegisterBox>
      </Wrapper>
    );
  }
}
