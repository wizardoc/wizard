import {CardHeader, IconButton} from '@material-ui/core';
import {AvatarProps} from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {Inject} from 'react-ts-di';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import {withTheme, ThemeComponentProps} from 'src/app/theme';
import {Menu} from 'src/app/ui';

import {
  UserBaseInfo,
  OrganizationService,
  Toast,
  ConfirmDialogService,
} from '../../services';
import {Avatar} from '../common';

interface HeaderOwnerProps {
  ownerInfo: UserBaseInfo;
  organizeName: string;
  id: string;
}

interface OrganizationAction {
  text: string;
  handler(): void;
}

const PrimaryAvatar = styled.div`
  width: 42px;
  height: 42px;
` as ComponentType<AvatarProps>;

@withRouter
@withTheme
@observer
export class HeaderOwner extends Component<
  HeaderOwnerProps & Partial<ThemeComponentProps & RouteComponentProps>
> {
  @Inject
  organizationService!: OrganizationService;

  @Inject
  toast!: Toast;

  @Inject
  confirmDialog!: ConfirmDialogService;

  organizationActions: OrganizationAction[] = [
    {
      text: '删除组织',
      handler: () => this.handleRemoveOrganizationClick(),
    },
    {
      text: '编辑组织',
      handler: () => this.handleEditOrganizationClick(),
    },
  ];

  handleEditOrganizationClick(): void {
    const {history, id} = this.props;

    history!.push(`organization/edit/${id}`);
  }

  async handleRemoveOrganizationClick(): Promise<void> {
    const {organizeName} = this.props;

    await this.confirmDialog.confirm({
      content: `确认要删除 ${organizeName} 组织吗？`,
      onSureClick: async () => {
        const result = await this.organizationService.removeOrganization(
          organizeName,
        );

        result.success(() => {
          this.toast.success(`成功删除${organizeName}`);
        });
      },
    });
  }

  render(): ReactNode {
    const {ownerInfo, theme} = this.props;
    const {primaryColor, white} = theme!;

    return (
      <CardHeader
        avatar={
          <PrimaryAvatar>
            <Avatar bgColor={primaryColor} color={white} />
          </PrimaryAvatar>
        }
        title={ownerInfo.displayName}
        subheader="Owner"
        action={
          <Menu
            bind={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            menuItems={this.organizationActions}
          />
        }
      />
    );
  }
}
