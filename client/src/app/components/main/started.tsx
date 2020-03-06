// import {Typography} from '@material-ui/core';
import Button, {ButtonProps} from '@material-ui/core/Button';
import React, {Component, ComponentType, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';
import {Zoom} from '@material-ui/core';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import GithubPng from 'src/app/assets/static/github.png';

import Main from '../../assets/static/main_code.svg';
import {User} from '../../services';
import {ReleaseBanner} from '../release-banner';

import {SkewBlock} from './@skew-block';
import {KnowledgeCard} from './knowledge-card';

// import {GithubBtn} from './@github-btn';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const StartPanel = styled.div`
  height: 700px;
  display: flex;
  justify-content: space-around;
  background: ${props => props.theme.white};
`;

const BaseButton = styled(ActionButton)`
  height: 35px !important;
  width: 150px !important;
  border-radius: 1000px !important;
` as ComponentType<ButtonProps>;

const GetStarted = styled(BaseButton)`
  /* border-color: white !important;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5) !important;
  } */
  margin-left: 35px !important;
` as ComponentType<ButtonProps>;

const GitHubLnk = styled(BaseButton)`
  background: ${props => props.theme.secondaryColor} !important;
` as ComponentType<ButtonProps>;

const StartedWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 35px !important;
`;

const WizardTitle = styled.p`
  font-size: 30px;
  color: ${props => props.theme.titleColor};
  margin: 0;
`;

const Description = styled.p`
  width: 500px;
  margin-top: 30px;
  line-height: 40px;
  color: ${props => props.theme.subTitleColor};
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

const Circle = styled.div`
  width: 200px;
  height: 200px;
  position: absolute;
  top: 800px;
  left: -100px;
  z-index: 1;
  border-radius: 50%;
  background: ${props => props.theme.mainSecondaryColor};
`;

const GitHubIcon = styled.img`
  width: 20px;
  margin-right: 5px;
`;

interface StartedProps extends RouteComponentProps {}

@observer
class TStarted extends Component<StartedProps> {
  @Inject
  private userService!: User;

  @observable
  isMounted = false;

  handleGetStartClick(): void {
    const {isLogin} = this.userService;
    const {history} = this.props;

    if (isLogin) {
      history.push('/doc');
    } else {
      history.push('/user/login');
    }
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <StartPanel>
          <WizardDescription>
            <DescriptionContainer>
              <ReleaseBanner tag="NEW"></ReleaseBanner>
              <WizardTitle>与知识管理相结合的文档管理平台</WizardTitle>
              <Description>
                开源免费的文档管理平台，管理 API 文档，前端组件文档，markdown
                文档的绝佳平台，为技术服务，技术分享知识分享平台。赶紧创建自己的第一个
                wizard 组织吧！
              </Description>
              <StartedWrapper>
                <GitHubLnk variant="contained" color="secondary">
                  <GitHubIcon src={GithubPng} />
                  GitHub
                </GitHubLnk>
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
          <Zoom in={this.isMounted}>
            <MainImgWrapper>
              <MainImg src={Main} />
            </MainImgWrapper>
          </Zoom>
        </StartPanel>
        <Circle></Circle>
        <SkewBlock></SkewBlock>
        <KnowledgeCard />
      </Wrapper>
    );
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.isMounted = true;
    }, 500);
  }
}

export const Started = withRouter(TStarted);
