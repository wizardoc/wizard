import {Button, Step, StepLabel, Stepper} from '@material-ui/core';
import {StepperProps} from '@material-ui/core/Stepper';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloseIcon from '@material-ui/icons/Close';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';

import {AccessDialogStore} from '../../store';
import {InjectStore} from '../../utils';

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

  handleCloseClick(): void {
    this.accessDialogStore.accessDialogToggle();
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <StepperWrapper>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </StepperWrapper>

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
            <Button variant="contained" color="primary">
              下一步
              <ArrowForwardIcon />
            </Button>
          </ButtonsWrapper>
        </Row>
      </Wrapper>
    );
  }
}
