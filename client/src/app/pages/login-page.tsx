import {Typography} from '@material-ui/core';
import {TypographyProps} from '@material-ui/core/Typography';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';

import Wizard from '../assets/static/wizard.png';
import {Login} from '../components';

import {AccessBox, Wrapper} from './common-style-component/access-wrapper';

const LoginWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginBox = styled(AccessBox)``;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 30px;
`;

const Box = styled.div`
  position: relative;
  top: -50px;
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled(Typography)`
  font-size: 58px !important;
  color: #636e72;
  font-weight: 100 !important;
  margin-left: 20px !important;
` as ComponentType<TypographyProps>;

export class LoginPage extends Component {
  render(): ReactNode {
    return (
      <LoginWrapper>
        <Box>
          <Banner>
            <Logo src={Wizard} />
            <Title>Wizard</Title>
          </Banner>
          <LoginBox>
            <Login />
          </LoginBox>
        </Box>
      </LoginWrapper>
    );
  }
}
