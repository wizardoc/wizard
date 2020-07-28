import {CardHeader, IconButton} from '@material-ui/core';
import {AvatarProps} from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {Inject} from '@wizardoc/injector';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import {withTheme, ThemeComponentProps} from 'src/app/theme';
import {Menu, MenuItem} from 'src/app/ui';
import {PermissionValues} from 'src/app/services/permission';

import {
  UserBaseInfo,
  OrganizationService,
  Toast,
  ConfirmDialogService,
  DialogService,
} from '../../services';
import {Avatar} from '../common';
import {InviteMemberDialog} from '../overview';

interface HeaderOwnerProps {
  ownerInfo: UserBaseInfo;
  organizeName: string;
  id: string;
  permissions: PermissionValues[];
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

  @Inject
  dialogService!: DialogService;

  organizationActions: MenuItem[] = [
    {
      text: '删除组织',
      permission: PermissionValues.ORG_DELETE,
      handler: () => this.handleRemoveOrganizationClick(),
    },
    {
      text: '编辑组织',
      permission: PermissionValues.ORG_EDIT,
      handler: () => this.handleEditOrganizationClick(),
    },
    {
      text: '邀请成员',
      permission: PermissionValues.ORG_INVITE,
      handler: () => this.handleInviteMemberClick(),
    },
  ];

  handleInviteMemberClick(): void {
    this.dialogService.open(InviteMemberDialog, {
      title: '邀请',
      isClickAwayClose: true,
      componentProps: {
        organizeName: this.props.organizeName,
      },
    });
  }

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
    const {ownerInfo, theme, permissions} = this.props;
    const {primaryColor, white} = theme!;

    return (
      <CardHeader
        avatar={
          <PrimaryAvatar>
            <Avatar
              displayName={ownerInfo.displayName}
              bgColor={primaryColor}
              color={white}
              lnk={ownerInfo.avatar}
            />
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
            permissions={permissions}
            menuItems={this.organizationActions}
          />
        }
      />
    );
  }
}
