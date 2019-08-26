import React, {Component, FunctionComponent, ReactNode} from 'react';
import styled from 'styled-components';

import {WithSlideProps, withSlide} from '../animations';
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

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card: FunctionComponent = withSlide({
  direction: 'right',
  timeout: 300,
})(({exitAnimation}: WithSlideProps) => (
  <CardWrapper>
    <TipCard></TipCard>
    <RegisterBox>
      <Register exitAnimation={exitAnimation} />
    </RegisterBox>
  </CardWrapper>
));

export class RegisterPage extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <Card></Card>
      </Wrapper>
    );
  }
}
