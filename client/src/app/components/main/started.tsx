// import {Typography} from '@material-ui/core';
import {ButtonProps} from '@material-ui/core/Button';
import React, {Component, ComponentType, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';
import {Zoom} from '@material-ui/core';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import Main from '../../assets/static/main_code.svg';
import {MAIN_PAGE, USER} from '../../constant';
import {User} from '../../services';
import {ActionButton} from '../../ui';
import {ReleaseBanner} from '../release-banner';

import {SkewBlock} from './@skew-block';

// import {GithubBtn} from './@github-btn';

const Wrapper = styled.div`
  width: 100%;
`;

const StartPanel = styled.div`
  height: 700px;
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
  margin-top: 35px !important;
`;

const WizardTitle = styled.p`
  font-size: 30px;
  color: white;
  margin: 0;
`;

const Description = styled.p`
  width: 500px;
  margin-top: 30px;
  line-height: 40px;
  color: white;
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
      history.push(MAIN_PAGE.DOCUMENT);
    } else {
      history.push(USER.LOGIN);
    }
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <StartPanel>
          <WizardDescription>
            <DescriptionContainer>
              <ReleaseBanner tag="NEW"></ReleaseBanner>
              <WizardTitle>Document management platform</WizardTitle>
              <Description>
                开源免费的文档管理平台，管理 API 文档，前端组件文档，markdown
                文档的绝佳平台，为技术服务，技术分享知识分享平台。赶紧创建自己的第一个
                wizard 组织吧！
              </Description>
              <StartedWrapper>
                <GetStarted
                  variant="outlined"
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
        <SkewBlock></SkewBlock>
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
