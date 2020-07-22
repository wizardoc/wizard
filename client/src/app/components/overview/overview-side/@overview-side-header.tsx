import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Typography, IconButton} from '@material-ui/core';
import {Inject} from '@wizardoc/injector';
import {observer} from 'mobx-react';
import EditIcon from '@material-ui/icons/Edit';

import {User} from 'src/app/services';

import {Avatar} from '../../common';

const Wrapper = styled.div`
  background: ${props => props.theme.primaryColor};
  width: 100%;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const StyledAvatar = styled(Avatar)`
  width: 50px !important;
  height: 50px !important;
  border: 1px solid ${props => props.theme.white};
`;

const UserName = styled(Typography)`
  color: ${props => props.theme.white} !important;
  margin-top: 12px !important;
`;

const UserIntro = styled(Typography)`
  color: ${props => props.theme.deepGray};
  font-size: 12px !important;
  margin: 4px 0 10px 0 !important;
`;

const EditUserInfoButton = styled.div`
  position: absolute;
  bottom: -21px;
`;

const StyledIconButton = styled(IconButton)`
  background: ${props => props.theme.white} !important;
  box-shadow: ${props => props.theme.flatShadow};
`;

@observer
export class OverviewSideHeader extends Component {
  @Inject
  user!: User;

  render(): ReactNode {
    const {displayName, avatar, intro} = this.user.userInfo ?? {};

    return (
      <Wrapper>
        <StyledAvatar lnk={avatar} />
        <UserName>{displayName}</UserName>
        <UserIntro>{intro}</UserIntro>
        <EditUserInfoButton>
          <StyledIconButton>
            <EditIcon />
          </StyledIconButton>
        </EditUserInfoButton>
      </Wrapper>
    );
  }
}
