import { CardHeader, IconButton } from '@material-ui/core';
import { AvatarProps } from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { Component, ComponentType, ReactNode } from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';

import { withTheme, ThemeComponentProps } from 'src/app/theme';

import { UserBaseInfo } from '../../services';
import { Avatar } from '../common';

interface HeaderOwnerProps {
  ownerInfo: UserBaseInfo;
}

const PrimaryAvatar = styled.div`
  width: 42px;
  height: 42px;
` as ComponentType<AvatarProps>;

@withTheme
@observer
export class HeaderOwner extends Component<
HeaderOwnerProps & Partial<ThemeComponentProps>
> {
  render(): ReactNode {
    const { ownerInfo, theme } = this.props;
    const { primaryColor, white } = theme!;

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
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      ></CardHeader>
    );
  }
}
