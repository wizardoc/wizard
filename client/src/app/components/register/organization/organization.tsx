import {Typography, WithStyles, withStyles} from '@material-ui/core';
import {StyleRules, createStyles} from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from '@material-ui/lab/ToggleButtonGroup';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {
  DialogService,
  OrganizationService,
  ParsedRegisterData,
  Toast,
  User,
} from '../../../services';
import {TipContent, TipVariant} from '../../../ui';
import {NextStep} from '../common/buttons';
import {PartViewProps} from '../common/part-view-props';

import {CreateNewOrganization} from './@create-new-organization';
import {JoinExistOrganization} from './@join-exist-organization';

const Wrapper = styled.div``;

const styles = (): StyleRules => createStyles({});

const SelectGroup = styled(ToggleButtonGroup)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 34px;
` as ComponentType<ToggleButtonGroupProps>;

const RenderComponents = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

enum ORGANIZATION_TAB_NAME {
  NEW_ORGANIZATION,
  JOIN_EXIST_ORGANIZATION,
}

export interface OrganizationData {
  organizationName: string;
  organizationDescription: string | undefined;
}

export interface OrganizationProps {}

@observer
export class TOrganization extends Component<
  OrganizationProps & WithStyles<typeof styles> & PartViewProps
> {
  @observable
  private currentGroup = ORGANIZATION_TAB_NAME.NEW_ORGANIZATION;

  @observable
  private organizationInfo: OrganizationData | undefined;

  @Inject
  private userService!: User;

  @Inject
  private toast!: Toast;

  @Inject
  private organizationService!: OrganizationService;

  @Inject
  private dialogService!: DialogService;

  @action
  handleOrganizationInfoChange(info: OrganizationData): void {
    this.organizationInfo = info;
  }

  handleNextStepClick(): void {
    this.dialogService.loading(async () => {
      if (!this.organizationInfo) {
        return;
      }

      this.props.onNextStepClick();

      const {organizationName, organizationDescription} = this.organizationInfo;

      // 注册用户
      await this.userService.register();

      const registerData = this.userService.registerData as ParsedRegisterData;

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
    });
  }

  render(): ReactNode {
    return (
      <>
        <Wrapper>
          <TipContent
            tipVariant={TipVariant.Main}
            message={
              <>
                <Typography variant="h6" component="h3">
                  选择一个组织，开始你的规范日程
                </Typography>
                <Typography>
                  组织是 wizard 的顶层建筑，规范由组织维护
                </Typography>
              </>
            }
          />
          <SelectGroup
            exclusive
            value={this.currentGroup}
            onChange={(_, currentGroup) => (this.currentGroup = currentGroup)}
          >
            <ToggleButton value={ORGANIZATION_TAB_NAME.NEW_ORGANIZATION}>
              创建新的组织
            </ToggleButton>
            <ToggleButton value={ORGANIZATION_TAB_NAME.JOIN_EXIST_ORGANIZATION}>
              加入已存在的组织
            </ToggleButton>
          </SelectGroup>
          <RenderComponents>{this.renderComponent()}</RenderComponents>
        </Wrapper>
        <NextStep onClick={() => this.handleNextStepClick()}>下一步</NextStep>
      </>
    );
  }

  private renderComponent(): ReactNode {
    return this.currentGroup === ORGANIZATION_TAB_NAME.NEW_ORGANIZATION ? (
      <CreateNewOrganization
        onOrganizationInfoChange={(info: any) =>
          this.handleOrganizationInfoChange(info)
        }
      />
    ) : (
      <JoinExistOrganization
        onOrganizationInfoChange={info =>
          this.handleOrganizationInfoChange(info)
        }
      />
    );
  }
}

export const Organization = withStyles(styles)(TOrganization);
