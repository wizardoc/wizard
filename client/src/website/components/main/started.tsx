// import {Typography} from '@material-ui/core';
import Button, {ButtonProps} from '@material-ui/core/Button';
import React, {Component, ComponentType, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Inject} from '@wizardoc/injector';
import styled from 'styled-components';
import {observer} from 'mobx-react';

// import GithubPng from 'website/assets/static/github.png';

import Main from '../../assets/static/main.png';
import {User} from '../../services';
import {ReleaseBanner} from '../release-banner';

// import {GithubBtn} from './@github-btn';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const StartPanel = styled.div`
  height: 700px;
  display: flex;
  justify-content: space-around;
  background: ${props => props.theme.primaryColor};
`;

const BaseButton = styled(Button)`
  height: 44px !important;
  width: 200px !important;
  background: ${props => props.theme.white} !important;
  color: ${props => props.theme.primaryColor} !important;
` as ComponentType<ButtonProps>;

const GetStarted = styled(BaseButton)`
  /* border-color: white !important;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5) !important;
  } */
` as ComponentType<ButtonProps>;

// const GitHubLnk = styled(BaseButton)`
//   background: ${props => props.theme.secondaryColor} !important;
// ` as ComponentType<ButtonProps>;

const StartedWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 35px !important;
`;

const WizardTitle = styled.p`
  font-size: 30px;
  color: ${props => props.theme.white};
  margin: 0;
`;

const Description = styled.p`
  width: 500px;
  margin-top: 30px;
  line-height: 40px;
  color: ${props => props.theme.shallowGray};
`;

const WizardDescription = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const DescriptionContainer = styled.div`
  position: relative;
`;

const MainImg = styled.img`
  height: 500px;
`;

const MainImgWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
`;

// const GitHubIcon = styled.img`
//   width: 20px;
//   margin-right: 5px;
// `;

interface StartedProps {}

@withRouter
@observer
export class Started extends Component<
  StartedProps & Partial<RouteComponentProps>
> {
  @Inject
  userService!: User;

  handleGetStartClick(): void {
    this.props.history!.push('/overview');
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <StartPanel>
          <WizardDescription>
            <DescriptionContainer>
              <ReleaseBanner tag="NEW"></ReleaseBanner>
              <WizardTitle>文档也可以是知识分享的途径</WizardTitle>
              <Description>
                所有文档 Cloud 化，丰富的 Markdown
                语法，轻松的交流体验，开源免费的绝佳文档管理平台
              </Description>
              <StartedWrapper>
                {/* <GitHubLnk variant="contained" color="secondary">
                  <GitHubIcon src={GithubPng} />
                  GitHub
                </GitHubLnk> */}
                <GetStarted
                  variant="contained"
                  color="primary"
                  onClick={() => this.handleGetStartClick()}
                >
                  立即开始!
                </GetStarted>
                {/* <GithubBtn /> */}
              </StartedWrapper>
            </DescriptionContainer>
          </WizardDescription>
          <MainImgWrapper>
            <MainImg src={Main} />
          </MainImgWrapper>
        </StartPanel>
      </Wrapper>
    );
  }
}
