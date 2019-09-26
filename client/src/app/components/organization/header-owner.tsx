import {Avatar, CardHeader, IconButton} from '@material-ui/core';
import {AvatarProps} from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';

import {UserBaseInfo, getAvatar} from '../../services';

interface HeaderOwnerProps {
  ownerInfo: UserBaseInfo;
}

const PrimaryAvatar = styled(Avatar)`
  background: ${props => props.theme.primaryColor} !important;
` as ComponentType<AvatarProps>;

export class HeaderOwner extends Component<HeaderOwnerProps> {
  render(): ReactNode {
    const {ownerInfo} = this.props;

    return (
      <CardHeader
        avatar={<PrimaryAvatar>{getAvatar(ownerInfo)}</PrimaryAvatar>}
        title={ownerInfo.displayName}
        subheader="Owner"
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      ></CardHeader>
    );
  }
}
