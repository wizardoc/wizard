import {SwipeableDrawer} from '@material-ui/core';
import {ListItemProps} from '@material-ui/core/ListItem';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';

import {ProfileStore} from '../../store';
import {DrawerHeader} from '../../ui';
import {InjectStore} from '../../utils';

import {UserAvatar} from './@user-avatar';
import {UserItem} from './@user-item';

const Wrapper = styled.div``;

const HeaderIcon = styled(AssignmentIndIcon)`
  font-size: 30px;
` as ComponentType<ListItemProps>;

const AvatarWrapper = styled.div`
  padding: 60px;
`;

@observer
export class Profile extends Component {
  @InjectStore(ProfileStore)
  private profileStore!: ProfileStore;

  render(): ReactNode {
    const {isViewProfilePanel, toggleViewProfilePanel} = this.profileStore;

    return (
      <SwipeableDrawer
        open={isViewProfilePanel}
        anchor="right"
        onOpen={toggleViewProfilePanel}
        onClose={toggleViewProfilePanel}
      >
        <DrawerHeader title="个人信息" icon={<HeaderIcon />}></DrawerHeader>
        <Wrapper>
          <AvatarWrapper>
            <UserAvatar></UserAvatar>
          </AvatarWrapper>
          <UserItem></UserItem>
        </Wrapper>
      </SwipeableDrawer>
    );
  }
}
