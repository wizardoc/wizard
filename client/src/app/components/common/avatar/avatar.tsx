import React, {Component, ReactNode, ComponentType} from 'react';
import {Avatar as MaterialAvatar} from '@material-ui/core';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {AvatarProps as MaterialAvatarProps} from '@material-ui/core/Avatar';

import {withTheme, ThemeComponentProps} from 'src/app/theme';

export interface AvatarProps extends AvatarWrapperProps {
  // the lnk of avatar
  lnk?: string;
  username?: string;
}

interface AvatarWrapperProps {
  bgColor?: string;
  color?: string;
}

const AvatarWrapper = styled(MaterialAvatar)<AvatarWrapperProps>`
  background: ${props => props.bgColor} !important;
  color: ${props => props.color} !important;
` as ComponentType<AvatarWrapperProps & MaterialAvatarProps>;

@withTheme
@observer
export class Avatar extends Component<
  AvatarProps & Partial<ThemeComponentProps>
> {
  render(): ReactNode {
    const {
      theme,
      lnk,
      bgColor = theme!.avatarBgGray,
      color = theme!.fontGray,
      username = '',
    } = this.props;

    return (
      <AvatarWrapper {...this.props} src={lnk} bgColor={bgColor} color={color}>
        {username.slice(0, 1)}
      </AvatarWrapper>
    );
  }
}
