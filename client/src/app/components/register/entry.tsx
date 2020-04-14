import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styled from 'styled-components';

import {WithSlideProps} from '../../animations';
import {A, Title} from '../../ui';

import {BaseInfo} from './base-info';
import {Complete} from './complete';
import {Organization} from './organization';

export interface FormBodyProps {
  index: number;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 30px;
  flex-direction: column;
  transition: 0.3s height;
`;

const RegisterBodyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.div`
  width: 100%;
`;

@withRouter
@observer
export class Register extends Component<
  WithSlideProps & Partial<RouteComponentProps>
> {
  @observable
  private currentIndex = 0;

  private registerBody = [
    <BaseInfo onNextStepClick={(): void => this.nextStepToggle()} />,
    <Organization onNextStepClick={(): void => this.nextStepToggle()} />,
    <Complete />,
  ];

  get viewerBody(): any {
    return this.registerBody[this.currentIndex];
  }

  @action
  nextStepToggle(): void {
    if (this.currentIndex !== this.registerBody.length) {
      this.currentIndex += 1;
    }
  }

  @action
  preStepToggle(): void {
    if (this.currentIndex !== 0) {
      this.currentIndex -= 1;
    }
  }

  get isFinish(): boolean {
    return this.currentIndex === this.registerBody.length - 1;
  }

  handleLoginClick(): void {
    const {history, exitAnimation} = this.props;

    exitAnimation(() => history!.push('/user/login'));
  }

  handleNextClick(): void {
    this.nextStepToggle();
  }

  handlePreClick(): void {
    this.preStepToggle();
  }

  handleBackClick(): void {
    this.preStepToggle();
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <TitleWrapper>
          <Title
            isReverse
            hasBack={!this.isFinish}
            onBackClick={() => this.handleBackClick()}
          >
            注册
          </Title>
        </TitleWrapper>
        <RegisterBodyWrapper>{this.viewerBody}</RegisterBodyWrapper>
        {!this.isFinish && (
          <A onClick={() => this.handleLoginClick()}>已有账号？立即登录！</A>
        )}
      </Wrapper>
    );
  }
}
