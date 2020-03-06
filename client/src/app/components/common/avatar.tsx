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
  size?: string;
}

const AvatarWrapper = styled(MaterialAvatar)<AvatarWrapperProps>`
  width: ${props => props.size} !important;
  height: ${props => props.size} !important;
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
    const {theme, lnk, size = "100%"} = this.props;
    const {bgColor = theme!.avatarBgGray, color = theme!.fontGray} = this.props;
    const {avatar} = this.userService;
    const srcProps = this.regexUtils.validURL(avatar) ? {src: avatar} : {};
    const src = lnk ?? avatar

    return (
      <AvatarWrapper src={src} size={size} {...srcProps} bgColor={bgColor} color={color}>
        {src}
      </AvatarWrapper>
    );
  }
}
