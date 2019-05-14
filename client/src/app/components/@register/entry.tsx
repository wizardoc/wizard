import {Button, Step, StepLabel, Stepper} from '@material-ui/core';
import {StepperProps} from '@material-ui/core/Stepper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloseIcon from '@material-ui/icons/Close';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';

import {AccessDialogStore} from '../../store';
import {InjectStore} from '../../utils';

import {BaseInfo} from './base-info';
import {Complete} from './complete';
import {Origanization} from './origanization';

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 24px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  margin-top: 26px;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const StepperWrapper = styled(Stepper)`
  width: 100%;
` as ComponentType<StepperProps>;

const steps = ['填写基本信息', '确定组织', '完成注册'];

@observer
export class Register extends Component {
  @InjectStore(AccessDialogStore)
  private accessDialogStore!: AccessDialogStore;

  @observable
  private currentIndex = 0;

  private registerBody = [<BaseInfo />, <Complete />, <Origanization />];

  @action
  nextStepToggle(): void {
    this.currentIndex += 1;
  }

  @action
  preStepToggle(): void {
    this.currentIndex -= 1;
  }

  handleCloseClick(): void {
    this.accessDialogStore.accessDialogToggle();
  }

  handleNextClick(): void {
    this.nextStepToggle();
  }

  handlePreClick(): void {
    this.preStepToggle();
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <StepperWrapper activeStep={this.currentIndex}>
          {steps.map((label, index) => (
            <Step key={label} completed={index < this.currentIndex}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </StepperWrapper>
        {this.registerBody[this.currentIndex]}
        <Row>
          <ButtonsWrapper>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.handleCloseClick()}
            >
              取消
              <CloseIcon />
            </Button>
            {this.currentIndex > 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.handlePreClick()}
              >
                <ArrowBackIcon />
                上一步
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleNextClick()}
            >
              下一步
              <ArrowForwardIcon />
            </Button>
          </ButtonsWrapper>
        </Row>
      </Wrapper>
    );
  }
}
