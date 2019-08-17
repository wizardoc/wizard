import {IconButton, SvgIcon, Typography} from '@material-ui/core';
import {IconButtonProps} from '@material-ui/core/IconButton';
import {TypographyProps} from '@material-ui/core/Typography';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';

import {Circle} from '../assets';
import WhiteWizard from '../assets/static/wizard-white.jpg';

interface ShadeProps {
  isShutdown?: boolean;
}

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  background: ${props => props.theme.dark};
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: hidden;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Shade = styled.div<ShadeProps>`
  width: ${props => (props.isShutdown ? '110%' : 0)};
  height: 0;
  padding-bottom: ${props => (props.isShutdown ? '110%' : 0)};
  border-radius: 10000px;
  background: ${props => props.theme.primaryColor};
  transition: 0.3s all;
`;

const CircleIconButtonWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
` as ComponentType<IconButtonProps>;

const PrimaryTypography = styled(Typography)`
  color: white !important;
` as ComponentType<TypographyProps>;

const Wizard = styled.img`
  width: 20px;
  margin: 0 10px;
`;

const WizardWrapperRight = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
`;

const WizardWrapperLeft = styled.div`
  flex: 1;
  text-align: right;
`;

@observer
export class Footer extends Component {
  @observable
  isShutdown = false;

  @action
  shutdownToggle(): void {
    this.isShutdown = !this.isShutdown;
  }

  handleCircleClick(): void {
    this.shutdownToggle();
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <InnerWrapper>
          <Shade isShutdown={this.isShutdown}>
            <CircleIconButtonWrapper>
              <WizardWrapperLeft>
                <PrimaryTypography>Copyright</PrimaryTypography>
              </WizardWrapperLeft>
              <IconButton onClick={() => this.handleCircleClick()}>
                <SvgIcon>
                  <Circle />
                </SvgIcon>
              </IconButton>
              <WizardWrapperRight>
                <PrimaryTypography>Wizard</PrimaryTypography>
                <Wizard src={WhiteWizard} />
                <PrimaryTypography>Since 2019</PrimaryTypography>
              </WizardWrapperRight>
            </CircleIconButtonWrapper>
          </Shade>
        </InnerWrapper>
      </Wrapper>
    );
  }
}
