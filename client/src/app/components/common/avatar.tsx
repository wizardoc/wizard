import React, {Component, ReactNode, ComponentType} from 'react';
import {Inject} from 'react-ts-di';
import {Avatar as MaterialAvatar} from '@material-ui/core';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {AvatarProps as MaterialAvatarProps} from '@material-ui/core/Avatar';

import {User, RegexUtils} from 'src/app/services';
import {WithThemeProps, withTheme} from 'src/app/theme';

export interface AvatarProps extends AvatarWrapperProps {}

interface AvatarWrapperProps {
  bgColor?: string;
  color?: string;
}

const AvatarWrapper = styled(MaterialAvatar)<AvatarWrapperProps>`
  width: 100% !important;
  height: 100% !important;
  background: ${props => props.bgColor} !important;
  color: ${props => props.color} !important;
` as ComponentType<AvatarWrapperProps & MaterialAvatarProps>;

@observer
@withTheme
export class Avatar extends Component<AvatarProps & Partial<WithThemeProps>> {
  @Inject
  userService!: User;

  @Inject
  regexUtils!: RegexUtils;

  render(): ReactNode {
    const {theme} = this.props;
    const {bgColor = theme!.avatarBgGray, color = theme!.fontGray} = this.props;
    const {avatar} = this.userService;
    const srcProps = this.regexUtils.validURL(avatar) ? {src: avatar} : {};

    return (
      <AvatarWrapper {...srcProps} bgColor={bgColor} color={color}>
        {avatar}
      </AvatarWrapper>
    );
  }
}
