import React, {Component, ReactNode, ComponentType} from 'react';
import {Avatar as MaterialAvatar} from '@material-ui/core';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {AvatarProps as MaterialAvatarProps} from '@material-ui/core/Avatar';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import {withTheme, ThemeComponentProps} from 'src/app/theme';

export interface AvatarProps extends AvatarWrapperProps {
  // the lnk of avatar
  lnk?: string;
  username?: string;
  id?: string;
}

interface AvatarWrapperProps {
  bgColor?: string;
  color?: string;
}

const AvatarWrapper = styled(MaterialAvatar)<AvatarWrapperProps>`
  background: ${props => props.bgColor} !important;
  color: ${props => props.color} !important;
  cursor: pointer;
` as ComponentType<AvatarWrapperProps & MaterialAvatarProps>;

@withRouter
@withTheme
@observer
export class Avatar extends Component<
  AvatarProps & Partial<ThemeComponentProps & RouteComponentProps>
> {
  handleAvatarClick(): void {
    const {id, history} = this.props;

    if (!id) {
      return;
    }

    history!.push(`/user/detail/${id}`);
  }

  render(): ReactNode {
    const {
      theme,
      lnk,
      bgColor = theme!.avatarBgGray,
      color = theme!.fontGray,
      username = '',
    } = this.props;

    return (
      <AvatarWrapper
        {...this.props}
        onClick={() => this.handleAvatarClick()}
        src={lnk}
        bgColor={bgColor}
        color={color}
      >
        {username.slice(0, 1)}
      </AvatarWrapper>
    );
  }
}
