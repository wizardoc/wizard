import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import {ButtonProps} from '@material-ui/core/Button';
import {CardProps} from '@material-ui/core/Card';
import {CardContentProps} from '@material-ui/core/CardContent';
import {TypographyProps} from '@material-ui/core/Typography';
import React, {ComponentType, FunctionComponent} from 'react';
import styled from 'styled-components';

import Wizard from '../../assets/static/wizard.png';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  margin-bottom: 50px;
`;

const AboutUsWrapper = styled(Card)`
  width: 700px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  border: 1px solid;
  box-shadow: none !important;
  border-color: #cecece;
  background-color: white;
  padding-right: 20px;
` as ComponentType<CardProps>;

const AboutUsActionButton = styled(Button)`
  border-radius: 1000px !important;
` as ComponentType<ButtonProps>;

const AboutUsContent = styled(CardContent)`
  display: flex;
  justify-content: center;
  align-items: center;
` as ComponentType<CardContentProps>;

const Title = styled(Typography)`
  font-size: 20px !important;
  font-weight: 200 !important;
` as ComponentType<TypographyProps>;

const Logo = styled.img`
  width: 60px;
  height: 60px;
`;

export const AboutUsCard: FunctionComponent = () => {
  return (
    <Wrapper>
      <AboutUsWrapper>
        <AboutUsContent>
          <div>
            <IconButton>
              <Logo src={Wizard} />
            </IconButton>
          </div>
          <div>
            <Title>大道至简的规范文档管理平台</Title>
            <Typography color="textSecondary">
              技术驱动，更接近技术的平台
            </Typography>
          </div>
        </AboutUsContent>
        <CardActions>
          <AboutUsActionButton variant="contained" color="primary">
            About Us
          </AboutUsActionButton>
        </CardActions>
      </AboutUsWrapper>
    </Wrapper>
  );
};
