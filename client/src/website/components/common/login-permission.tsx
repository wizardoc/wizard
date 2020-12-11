import React, {Component, ReactNode} from 'react';
import {Inject} from '@wizardoc/injector';

import {User} from 'website/services';

import {Default} from './default';

export interface LoginPermissionProps {
  loginView?: ReactNode;
  defaultView?: ReactNode;
}

export class LoginPermission extends Component<LoginPermissionProps> {
  @Inject
  user!: User;

  render(): ReactNode {
    const {loginView = <></>, defaultView = <></>} = this.props;

    return (
      <Default condition={() => !this.user._isLogin} defaultView={defaultView}>
        {loginView}
      </Default>
    );
  }
}
