import React, {Component, ReactNode} from 'react';
import {Inject} from '@wizardoc/injector';

import {User} from 'src/app/services';

import {Avatar} from './avatar';

export interface CurrentAvatarProps {}

export class CurrentAvatar extends Component {
  @Inject
  user!: User;

  render(): ReactNode {
    const {avatar, userInfo} = this.user;

    return <Avatar lnk={avatar} username={userInfo.username}></Avatar>;
  }
}
