import {CardActions, IconButton, Tooltip} from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import React, {Component, ReactNode} from 'react';

interface Action {
  tip: string;
  icon: ReactNode;
}

export class OrganizationActions extends Component {
  actions: Action[] = [
    {tip: '邀请用户', icon: <GroupAddIcon></GroupAddIcon>},
    {tip: '退出组织', icon: <MeetingRoomIcon></MeetingRoomIcon>},
  ];

  render(): ReactNode {
    return (
      <CardActions>
        {this.actions.map(({tip, icon}) => (
          <Tooltip title={tip} key={tip}>
            <IconButton>{icon}</IconButton>
          </Tooltip>
        ))}
      </CardActions>
    );
  }
}
