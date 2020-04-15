import React, {Component, ReactNode} from 'react';
import GroupIcon from '@material-ui/icons/Group';

import {SideBar, SideBarItem} from '../common';

const sideBarItems: SideBarItem[] = [
  {icon: <GroupIcon />, text: '组织', route: '/overview/organization'},
];

export class OverviewSide extends Component {
  render(): ReactNode {
    return <SideBar items={sideBarItems}></SideBar>;
  }
}
