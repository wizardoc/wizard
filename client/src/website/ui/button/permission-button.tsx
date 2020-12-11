// import React, {Component, ReactNode} from 'react';
// import {ButtonProps, Button} from '@material-ui/core';
// import {observer} from 'mobx-react';
// import {observable} from 'mobx';
// import {Inject} from '@wizardoc/injector';

// import {PermissionValues} from 'website/services/permission';
// import {OrganizationService} from 'website/services';

// export interface PermissionButtonProps extends ButtonProps {
//   organizationID: string;
//   permission: PermissionValues;
//   permissionType: 'organization' | 'document';
// }

export class PermissionButton {
  // @Inject
  // organizationService!: OrganizationService;
  // @observable
  // isShouldHidden: boolean;
  // permissionSet: PermissionValues[];
  // constructor(props: PermissionButtonProps) {
  //   super(props);
  //   const {permission, permissionType, organizationID} = props;
  //   this.permissionSet =
  //     permissionType === 'organization'
  //       ? this.organizationService.findOrganizationByID(organizationID)
  //           ?.permissions ?? []
  //       : [];
  // }
  // handleButtonClick(): void {
  //   // const {onClick = (): void => {}, permission} = this.props;
  // }
  // render(): ReactNode {
  //   return (
  //     <Button
  //       disabled={this.isShouldHidden}
  //       {...this.props}
  //       onClick={() => this.handleButtonClick()}
  //     ></Button>
  //   );
  // }
}
