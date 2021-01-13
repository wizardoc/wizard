import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Card, Button, Typography} from '@material-ui/core';
import {Inject} from '@wizardoc/injector';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import {ConfirmDialogService, OrganizationService, Toast} from 'website/services';

export interface OrganizationFunctionProps {
  organizationID: string;
}

const Wrapper = styled(Card)`
  display: flex;
  align-items: center;
  padding: 15px;
  justify-content: space-between;
`;

const DescriptionWrapper = styled.div`
  margin-right: 20px;
`;

const Title = styled(Typography)``;

const Description = styled(Typography)`
  font-size: 13px !important;
  color: ${props => props.theme.descriptionColor};
`;

const DismissButton = styled(Button)`
  flex-shrink: 0;
`;

@withRouter
export class OrganizationFunction extends Component<
  OrganizationFunctionProps & Partial<RouteComponentProps>
> {
  @Inject
  confirmDialogService!: ConfirmDialogService;

  @Inject
  organizationService!: OrganizationService;

  @Inject
  toast!: Toast;

  handleDismissClick(): void {
    const {history, organizationID} = this.props;

    this.confirmDialogService.confirm({
      title: '提醒信息',
      content: '确定要解散该组织吗？',
      onSureClick: async () => {
        const result = await this.organizationService.removeOrganization(organizationID);

        result.success(() => {
          this.toast.success('解散成功!');
          history!.replace('/overview');
        });
      },
    });
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <DescriptionWrapper>
          <Title>解散组织</Title>
          <Description>解散该组织，将会删除所有该组织的信息，请谨慎选择。</Description>
        </DescriptionWrapper>
        <DismissButton
          onClick={() => this.handleDismissClick()}
          color="primary"
          variant="contained"
        >
          解散组织
        </DismissButton>
      </Wrapper>
    );
  }
}
