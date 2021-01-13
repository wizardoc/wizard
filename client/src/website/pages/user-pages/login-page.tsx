// import {Typography} from '@material-ui/core';
// import {TypographyProps} from '@material-ui/core/Typography';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

// import Wizard from '../assets/static/wizard.png';
import {WithSlideProps, withSlide} from '../../animations';
import Wand from '../../assets/static/wizard-white.jpg';
import {Login} from '../../components';
import {AccessBox, Wrapper} from '../common-style-component/access-wrapper';
import {CenterLine} from '../common-style-component/center';
import {TipBody, TipText} from '../common-style-component/tip';

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

const Box = styled.div`
  display: flex;
  align-items: center;
`;

const TipCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 300px;
  height: 450px;
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
            <Wizard src={Wand} />
          </WizardWrapper>
          <CenterLine>LOGIN</CenterLine>
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
        <Card />
      </LoginWrapper>
    );
  }
}
