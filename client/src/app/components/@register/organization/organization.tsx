import {Typography, WithStyles, withStyles} from '@material-ui/core';
import {StyleRules, createStyles} from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from '@material-ui/lab/ToggleButtonGroup';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {Organization as organizationService} from '../../../services';
import {TipContent, TipVariant} from '../../../ui';

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const enum ORGANIZATION_TAB_NAME {
  NEW_ORGANIZATION,
  JOIN_EXIST_ORGANIZATION,
}

export interface OrganizationProps extends WithStyles<typeof styles> {}

@observer
export class TOrganization extends Component<OrganizationProps> {
  @Inject
  private organizationService!: organizationService;

  @observable
  private currentGroup = ORGANIZATION_TAB_NAME.NEW_ORGANIZATION;

  async componentDidMount(): Promise<void> {
    let a = await this.organizationService.getAllNames();

    console.info(a);
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <TipContent
          tipVariant={TipVariant.Main}
          message={
            <>
              <Typography variant="h6" component="h3">
                选择一个组织，开始你的规范日程
              </Typography>
              <Typography>组织是 wizard 的顶层建筑，规范由组织维护</Typography>
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
    );
  }

  private renderComponent(): ReactNode {
    return this.currentGroup === ORGANIZATION_TAB_NAME.NEW_ORGANIZATION ? (
      <CreateNewOrganization />
    ) : (
      <JoinExistOrganization />
    );
  }
}

export const Organization = withStyles(styles)(TOrganization);
