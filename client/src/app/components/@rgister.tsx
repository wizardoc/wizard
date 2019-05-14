import {
  Button,
  IconButton,
  InputAdornment,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloseIcon from '@material-ui/icons/Close';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {AccessDialogStore} from '../store';
import {InjectStore} from '../utils';

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 24px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
// TextFieldProps
const TextFieldWrapper = styled(TextField)<any>`
  width: 70%;
  margin: 0 50px;
  margin-top: 15px !important;
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

const steps = ['填写基本信息', '确定组织', '完成注册'];

@observer
export class Register extends Component {
  @observable
  private isViewPassword = false;

  @InjectStore(AccessDialogStore)
  private accessDialogStore!: AccessDialogStore;

  handleCloseClick(): void {
    this.accessDialogStore.accessDialogToggle();
  }

  handleViewPasswordClick(): void {
    this.isViewPassword = !this.isViewPassword;
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <Stepper>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <TextFieldWrapper
          label="昵称"
          type="text"
          autoComplete="new-password"
        />
        <TextFieldWrapper
          label="账号"
          type="text"
          autoComplete="new-password"
        />
        <TextFieldWrapper
          label="密码"
          type={this.isViewPassword ? 'text' : 'password'}
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="显示密码"
                  onClick={() => this.handleViewPasswordClick()}
                >
                  {this.isViewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextFieldWrapper
          label="邮箱"
          type="email"
          autoComplete="new-password"
        />
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
            {/* <IconButton onClick={() => this.handleCloseClick()}>
              <CloseIcon fontSize="large" />
            </IconButton>
            <IconButton>
              <ArrowForwardIcon fontSize="large" />
            </IconButton> */}
          </ButtonsWrapper>
        </Row>
      </Wrapper>
    );
  }
}
