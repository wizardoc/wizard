import React, {Component, ReactNode, ComponentType} from 'react';
import {Inject} from 'react-ts-di';
import {Avatar as MaterialAvatar} from '@material-ui/core';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {AvatarProps as MaterialAvatarProps} from '@material-ui/core/Avatar';

import {User, RegexUtils} from 'src/app/services';
import {withTheme, ThemeComponentProps} from 'src/app/theme';

export interface AvatarProps extends AvatarWrapperProps {
  // the lnk of avatar
  lnk?: string;
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
  @Inject
  userService!: User;

  @Inject
  regexUtils!: RegexUtils;

  render(): ReactNode {
    const {
      theme,
      lnk,
      bgColor = theme!.avatarBgGray,
      color = theme!.fontGray,
    } = this.props;
    const {avatar} = this.userService;
    const src = lnk ?? avatar;
    const srcProps = this.regexUtils.validURL(avatar) ? {src} : {};

    return (
      <AvatarWrapper
        {...this.props}
        src={src}
        {...srcProps}
        bgColor={bgColor}
        color={color}
      >
        {src}
      </AvatarWrapper>
    );
  }
}
