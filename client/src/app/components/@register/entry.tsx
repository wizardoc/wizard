import {Button, Step, StepLabel, Stepper} from '@material-ui/core';
import {StepperProps} from '@material-ui/core/Stepper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloseIcon from '@material-ui/icons/Close';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';

import {AccessDialogStore, TipStore} from '../../store';
import {FormInfo, FullValidator, Rules} from '../../ui';
import {InjectStore} from '../../utils';

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
  padding: 24px !important;
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

const Row = styled.div`
  width: 100%;
  display: flex;
  margin-top: 52px;
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

const baseInfoRule: Rules = {
  name: {
    validator: 'required',
  },
  username: {
    validator: 'required',
  },
  password: {
    validator: 'required',
  },
  email: {
    validator: 'required',
  },
};

@observer
export class Register extends Component {
  @InjectStore(AccessDialogStore)
  private accessDialogStore!: AccessDialogStore;

  @InjectStore(TipStore)
  private tipStore!: TipStore;

  @observable
  private currentIndex = 0;

  private formInfo: FormInfo = {};

  private baseInfoValidator!: () => boolean;

  private registerBody = [
    <BaseInfo
      baseInfoRule={baseInfoRule}
      onDataUpdate={(formInfo: FormInfo): void =>
        this.handleBaseInfoDataUpdate(formInfo)
      }
      getValidator={(validator: FullValidator): FullValidator =>
        (this.baseInfoValidator = validator)
      }
    />,
    <Organization />,
    <Complete />,
  ];

  @action
  nextStepToggle(): void {
    this.currentIndex += 1;
  }

  @action
  preStepToggle(): void {
    this.currentIndex -= 1;
  }

  isFinish(): boolean {
    return this.currentIndex === this.registerBody.length - 1;
  }

  handleCloseClick(): void {
    this.accessDialogStore.accessDialogToggle();
  }

  handleNextClick(): void {
    if (!this.baseInfoValidator()) {
      return;
    }

    if (this.isFinish()) {
      // complete register logic

      this.handleCloseClick();
      return;
    }

    this.nextStepToggle();
  }

  handlePreClick(): void {
    this.preStepToggle();
  }

  handleBaseInfoDataUpdate(formInfo: FormInfo): void {
    this.formInfo = {...this.formInfo, ...formInfo};
  }

  resetFormData(): void {
    this.formInfo = {};
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
        <RegisterBodyWrapper>
          {this.registerBody[this.currentIndex]}
        </RegisterBodyWrapper>
        <Row>
          <ButtonsWrapper>
            {!this.isFinish() && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.handleCloseClick()}
              >
                取消
                <CloseIcon />
              </Button>
            )}
            {this.currentIndex > 0 && !this.isFinish() && (
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
              {this.isFinish() ? '完成注册' : '下一步'}
              {this.isFinish() ? <FilterVintageIcon /> : <ArrowForwardIcon />}
            </Button>
          </ButtonsWrapper>
        </Row>
      </Wrapper>
    );
  }

  componentWillUnmount(): void {
    this.tipStore.destroy();
    this.resetFormData();
  }
}
