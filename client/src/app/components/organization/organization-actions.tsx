import {CardActions, IconButton, Tooltip} from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import React, {Component, ReactNode} from 'react';
import PowerOffIcon from '@material-ui/icons/PowerOff';
import {Inject} from 'react-ts-di';

import {
  User,
  OrganizationCardData,
  DialogService,
  OrganizationService,
} from '../../services';

import {OrganizationActionHandlerProps} from './organization-card';

interface Action {
  tip: string;
  icon: ReactNode;
  isHide?: boolean;
  handler(...args: unknown[]): void;
}

interface OrganizationActionsProps extends OrganizationActionHandlerProps {
  organizationCardData: OrganizationCardData;
}

export class OrganizationActions extends Component<OrganizationActionsProps> {
  @Inject
  user!: User;

  @Inject
  dialogService!: DialogService;

  @Inject
  organizationService!: OrganizationService;

  actions: Action[] = [
    {
      tip: '邀请用户',
      icon: <GroupAddIcon></GroupAddIcon>,
      handler: this.handleInviteUserClick,
    },
    {
      tip: '退出组织',
      icon: <MeetingRoomIcon></MeetingRoomIcon>,
      handler: this.handleQuitOrgClick,
      isHide: this.isOwner
    },
    {
      tip: '删除组织',
      icon: <PowerOffIcon></PowerOffIcon>,
      handler: () =>
        this.handleRemoveOrgClick(this.props.organizationCardData.organizeName),
      isHide: !this.isOwner,
    },
  ];

  handleInviteUserClick(): void {}

  handleQuitOrgClick(): void {}

  handleRemoveOrgClick(name: string): void {
    this.dialogService.confirm(
      '删除组织',
      `确认要删除 ${name} 吗？`,
      async () => {
        const {
          organizeName,
        } = await this.organizationService.removeOrganization(name);

        this.props.onOrganizationRemove(organizeName);
      },
    );
  }

  render(): ReactNode {
    return (
      <CardActions>
        {this.actions.map(
          ({tip, icon, isHide, handler}) =>
            !isHide && (
              <Tooltip title={tip} key={tip} onClick={() => handler()}>
                <IconButton>{icon}</IconButton>
              </Tooltip>
            ),
        )}
      </CardActions>
    );
  }

  get isOwner(): boolean {
    const {organizationCardData} = this.props;

    return (
      this.user.userInfo!.username === organizationCardData.ownerInfo.username
    );
  }
}
