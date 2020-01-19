import React, {Component, ReactNode} from 'react';
import {Inject} from 'react-ts-di';
import {Avatar as MaterialAvatar} from '@material-ui/core';
import styled from 'styled-components';
import {observer} from 'mobx-react';

import {User, RegexUtils} from 'src/app/services';

const AvatarWrapper = styled(MaterialAvatar)`
  width: 100% !important;
  height: 100% !important;
`;

@observer
export class Avatar extends Component {
  @Inject
  userService!: User;

  @Inject
  regexUtils!: RegexUtils;

  render(): ReactNode {
    const {avatar} = this.userService;
    const props = this.regexUtils.validURL(avatar) ? {src: avatar} : {};

    return <AvatarWrapper {...props}>{avatar}</AvatarWrapper>;
  }
}
