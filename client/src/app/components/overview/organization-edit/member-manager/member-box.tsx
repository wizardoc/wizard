import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import {Inject} from '@wizardoc/injector';

import {Avatar} from 'src/app/components';
import {Default} from 'src/app/components/common';
import {DialogService} from 'src/app/services';

import {InviteMemberDialog} from './invite-member-dialog';

interface MemberBoxProps {
  avatar?: string;
  username?: string;
  organizeName?: string;
}

const EmptyAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px dashed ${props => props.theme.coffeeGray};
  cursor: pointer;
`;

const Wrapper = styled.div`
  margin: 10px 5px;
`;

const StyledAvatar = styled(Avatar)`
  width: 42px !important;
  height: 42px !important;
  cursor: pointer;
`;

export class MemberBox extends Component<MemberBoxProps> {
  @Inject
  dialogService!: DialogService;

  handleInviteMemberClick(): void {
    this.dialogService.open(InviteMemberDialog, {
      title: '邀请',
      isClickAwayClose: true,
      componentProps: {
        organizeName: this.props.organizeName!,
      },
    });
  }

  render(): ReactNode {
    const {avatar, username} = this.props;

    return (
      <Wrapper>
        <Default
          condition={() => avatar === undefined}
          defaultView={
            <EmptyAvatar onClick={() => this.handleInviteMemberClick()}>
              <AddIcon />
            </EmptyAvatar>
          }
        >
          <StyledAvatar displayName={username ?? ''} lnk={avatar} />
        </Default>
      </Wrapper>
    );
  }
}
