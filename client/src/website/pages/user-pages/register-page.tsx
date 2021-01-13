import React, {Component, FunctionComponent, ReactNode} from 'react';
import styled from 'styled-components';

import {WithSlideProps, withSlide} from '../../animations';
import WandIcon from '../../assets/static/wand.png';
import {Register} from '../../components';
import {AccessBox, Wrapper} from '../common-style-component/access-wrapper';
import {CenterLine} from '../common-style-component/center';
import {TipBody, TipText} from '../common-style-component/tip';

const RegisterBox = styled(AccessBox)`
  height: 470px;
  width: 425px;
  border-radius: 10px 0 0 10px;
`;

const Wand = styled.img`
  width: 130px;
`;

const WandWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  /* margin-top: 30px; */
`;

const TipCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 300px;
  height: 470px;
  background: ${props => props.theme.primaryColor};
  border-radius: 0 10px 10px 0;
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
    <RegisterBox>
      <Register exitAnimation={exitAnimation} />
    </RegisterBox>
    <TipCard>
      <WandWrapper>
        <Wand src={WandIcon} />
      </WandWrapper>
      <CenterLine>REGISTER</CenterLine>
      <TipBody>
        <TipText>让文档都来！我来帮你管理！</TipText>
        <TipText>变动也让我来通知你！:)</TipText>
        <TipText>走进魔法世界</TipText>
      </TipBody>
    </TipCard>
  </CardWrapper>
));

export class RegisterPage extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <Card />
      </Wrapper>
    );
  }
}
