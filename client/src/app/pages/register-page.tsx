import React, {Component, FunctionComponent, ReactNode} from 'react';
import styled from 'styled-components';

import {WithSlideProps, withSlide} from '../animations';
import WandIcon from '../assets/static/wand.png';
import {Register} from '../components';

import {AccessBox, Wrapper} from './common-style-component/access-wrapper';
import {CenterLine} from './common-style-component/center';
import {TipBody, TipText} from './common-style-component/tip';

const RegisterBox = styled(AccessBox)``;

const Wand = styled.img`
  width: 200px;
`;

const WandWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const TipCard = styled.div`
  width: 300px;
  height: 584px;
  background: ${props => props.theme.primaryColor};
  border-radius: 10px 0 0 10px;
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
    <TipCard>
      <WandWrapper>
        <Wand src={WandIcon}></Wand>
      </WandWrapper>
      <CenterLine>REGISTER</CenterLine>
      <TipBody>
        <TipText>让文档都来！我来帮你管理！</TipText>
        <TipText>变动也让我来通知你！:)</TipText>
        <TipText>走进魔法世界</TipText>
      </TipBody>
    </TipCard>
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
