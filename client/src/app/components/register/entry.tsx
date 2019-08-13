import {Button, Step, StepLabel, Stepper} from '@material-ui/core';
import {StepperProps} from '@material-ui/core/Stepper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import CloseIcon from '@material-ui/icons/Close';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {
  OrganizationService,
  ParsedRegisterData,
  Toast,
  User,
} from '../../services';

import {BaseInfo, BaseInfoData} from './base-info';
import {Complete} from './complete';
import {Organization} from './organization';

export interface FormBodyProps {
  index: number;
}

export interface OrganizationData {
  organizationName: string;
  organizationDescription: string | undefined;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 50px 24px !important;
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
  width: 90%;
` as ComponentType<StepperProps>;

const steps = ['填写基本信息', '确定组织', '完成注册'];

const NextStep = styled(Button)`
  width: 200px;
`;

@observer
export class Register extends Component {
  @Inject
  private toast!: Toast;

  @Inject
  private userService!: User;

  @Inject
  private organizationService!: OrganizationService;

  @observable
  private currentIndex = 0;

  @observable
  private baseInfo: BaseInfoData | undefined;

  @observable
  private organizationInfo: OrganizationData | undefined;

  private registerBody = [
    {
      viewer: (
        <BaseInfo
          onBaseInfoChange={(info: BaseInfoData): void =>
            this.handleBaseInfoDataChange(info)
          }
        />
      ),
      handler: (): void =>
        this.baseInfo && this.userService.collectBaseInfo(this.baseInfo),
    },
    {
      viewer: (
        <Organization
          onOrganizationInfoChange={(info: OrganizationData): void =>
            this.handleOrganizationInfoChange(info)
          }
        />
      ),
      handler: async (): Promise<void> => {
        if (!this.organizationInfo) {
          return;
        }

        const {
          organizationName,
          organizationDescription,
        } = this.organizationInfo;

        await this.userService.register();

        const registerData = this.userService
          .registerData as ParsedRegisterData;

        if (!registerData) {
          this.toast.error('用户数据异常');

          return;
        }

        // 加入现有组织
        if (!organizationDescription) {
          await this.organizationService.joinOrganization(
            organizationName,
            registerData.username,
          );
        } else {
          await this.organizationService.createOrganization(
            organizationName,
            organizationDescription,
            registerData.username,
          );
        }

        this.toast.success('注册成功');
      },
    },
    {
      viewer: <Complete />,
      handler: (): void => {},
    },
  ];

  get viewerBody(): any {
    return this.registerBody[this.currentIndex];
  }

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

  handleCloseClick(): void {}

  handleBaseInfoDataChange(info: BaseInfoData): void {
    this.baseInfo = info;
  }

  handleOrganizationInfoChange(info: OrganizationData): void {
    this.organizationInfo = info;
  }

  async handleNextClick(): Promise<void> {
    if (this.isFinish()) {
      // complete register logic
      try {
        await this.userService.register();
      } catch (e) {
        console.error(e);
      }

      // this.handleCloseClick();
      return;
    }

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
        <RegisterBodyWrapper>{this.viewerBody.viewer}</RegisterBodyWrapper>
        <Row>
          <ButtonsWrapper>
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
            <NextStep
              variant="contained"
              color="primary"
              onClick={async () => {
                await this.viewerBody.handler();
                this.handleNextClick();
              }}
            >
              {this.isFinish() ? '完成注册' : '下一步'}
              {this.isFinish() ? <FilterVintageIcon /> : <ArrowForwardIcon />}
            </NextStep>
          </ButtonsWrapper>
        </Row>
      </Wrapper>
    );
  }
}
