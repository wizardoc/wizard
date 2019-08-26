// import {Typography} from '@material-ui/core';
// import {TypographyProps} from '@material-ui/core/Typography';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

// import Wizard from '../assets/static/wizard.png';
import {WithSlideProps, withSlide} from '../animations';
import Wand from '../assets/static/wizard-white.jpg';
import {Login} from '../components';
import {Center} from '../ui';

import {AccessBox, Wrapper} from './common-style-component/access-wrapper';

const LoginWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginBox = styled(AccessBox)`
  width: 400px;
  height: 450px;
  border-radius: 10px 0 0 10px;
`;

// const Logo = styled.img`
//   width: 120px;
//   margin-bottom: 30px;
// `;

const Box = styled.div`
  display: flex;
  align-items: center;
`;

const TipCard = styled.div`
  width: 300px;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.primaryColor};
  border-radius: 0 10px 10px 0;
`;

const Wizard = styled.img`
  width: 80px;
`;

const WizardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TipHeader = styled.div`
  width: 100%;
  margin-top: 100px;
  padding: 0 30px;
  box-sizing: border-box;
`;

const CenterText = styled.span`
  color: white;
`;

const TipBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const TipText = styled.div`
  color: white;
  margin-top: 20px;
`;

// const Banner = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Title = styled(Typography)`
//   font-size: 58px !important;
//   color: #636e72;
//   font-weight: 100 !important;
//   margin-left: 20px !important;
// ` as ComponentType<TypographyProps>;

class LoginCard extends Component<WithSlideProps> {
  render(): ReactNode {
    const {exitAnimation} = this.props;

    return (
      <Box>
        <LoginBox>
          <Login exitAnimation={exitAnimation} />
        </LoginBox>
        <TipCard>
          <WizardWrapper>
            <Wizard src={Wand}></Wizard>
          </WizardWrapper>
          <TipHeader>
            <Center lineColor="#fff">
              <CenterText>ABOUT</CenterText>
            </Center>
          </TipHeader>
          <TipBody>
            <TipText>管理文档就像魔法一样...</TipText>
            <TipText>哈！ 文档就管理好了！</TipText>
          </TipBody>
        </TipCard>
      </Box>
    );
  }
}

export class LoginPage extends Component {
  render(): ReactNode {
    const Card = withSlide({
      direction: 'left',
      timeout: 300,
    })(LoginCard);

    return (
      <LoginWrapper>
        <Card></Card>
      </LoginWrapper>
    );
  }
}
