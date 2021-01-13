import React, {Component, ReactNode} from 'react';
import {Button} from '@material-ui/core';
import {Inject} from '@wizardoc/injector';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import {MessageInvitePayload, OrganizationService, Toast} from 'website/services';

export interface InviteActionButtonsProps extends MessageInvitePayload {}

@observer
export class InviteActionButtons extends Component<InviteActionButtonsProps> {
  @Inject
  organizationService!: OrganizationService;

  @Inject
  toast!: Toast;

  @observable
  isDisableAcceptButton = false;

  constructor(props: InviteActionButtonsProps) {
    super(props);

    this.isDisableAcceptButton = this.organizationService.hasExistOrganization(
      props.organizeName,
    );
  }

  async handleAcceptInviteClick(): Promise<void> {
    const {organizeName, inviteToken} = this.props;

    const result = await this.organizationService.acceptInvite(organizeName, inviteToken);

    result.success(() => {
      this.toast.success(`欢迎加入 ${organizeName}！🎉🎉🎉`);
      this.isDisableAcceptButton = true;
    });
  }

  render(): ReactNode {
    return (
      <Button
        onClick={() => this.handleAcceptInviteClick()}
        variant="contained"
        color="primary"
        disabled={this.isDisableAcceptButton}
      >
        接受邀请
      </Button>
    );
  }
}
