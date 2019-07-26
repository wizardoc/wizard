// import {Typography} from '@material-ui/core';
import {ButtonProps} from '@material-ui/core/Button';
import React, {Component, ComponentType, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import Main from '../../assets/static/main.png';
import {MAIN_PAGE, USER} from '../../constant';
import {User} from '../../services';
import {ActionButton} from '../../ui';

// import {GithubBtn} from './@github-btn';
import {GithubBtn} from './@github-btn';
import {MainContent} from './@main-content';

const Wrapper = styled.div`
  width: 100%;
`;

const StartPanel = styled.div`
  height: 500px;
  display: flex;
  justify-content: space-around;
  background: ${props => props.theme.primaryColor};
`;

const BaseButton = styled(ActionButton)`
  width: 150px;
  color: white !important;
` as ComponentType<ButtonProps>;

const GetStarted = styled(BaseButton)`
  border-color: white !important;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5) !important;
  }
` as ComponentType<ButtonProps>;

const StartedWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 60px !important;
`;

// const GetStartedWrapper = styled.div`
//   width: 100%;
//   margin: 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const WizardTitle = styled.p`
  font-size: 70px;
  color: white;
  margin-top: 100px;
  margin-bottom: 0;
`;

const Description = styled.p`
  width: 400px;
  margin-top: 5px;
  line-height: 40px;
  color: white;
`;

const MainImg = styled.img`
  height: 100%;
`;

const WizardDescription = styled.div``;

// const CenterText = styled(Typography)`
//   display: flex;
//   align-items: center;
//   font-size: 25px !important;
//   color: white;
// ` as ComponentType<TypographyProps>;

interface StartedProps extends RouteComponentProps {}

class TStarted extends Component<StartedProps> {
  @Inject
  private userService!: User;

  handleGetStartClick(): void {
    const {isLogin} = this.userService;
    const {history} = this.props;

    if (isLogin) {
      history.push(MAIN_PAGE.DOCUMENT);
    } else {
      history.push(USER.REGISTER);
    }
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <StartPanel>
          <WizardDescription>
            <WizardTitle>Wizard</WizardTitle>
            <Description>
              绝佳的文档管理平台，免费，开源，服务于技术开发者，让文档管理如此轻松!
            </Description>
            <StartedWrapper>
              <GetStarted
                variant="outlined"
                color="primary"
                onClick={() => this.handleGetStartClick()}
              >
                立即开始!
              </GetStarted>
              <GithubBtn />
            </StartedWrapper>
          </WizardDescription>
          <MainImg src={Main} />
          {/* <CenterText>The awesome document management platform</CenterText> */}
        </StartPanel>
        {/* <GetStartedWrapper>
          <GetStarted
            variant="outlined"
            color="primary"
            onClick={() => this.handleGetStartClick()}
          >
            立即开始!
          </GetStarted>
          <GithubBtn />
        </GetStartedWrapper> */}
        <MainContent />
      </Wrapper>
    );
  }
}

export const Started = withRouter(TStarted);
