import React, {Component, ReactNode} from 'react';
import GroupIcon from '@material-ui/icons/Group';
import styled from 'styled-components';
import NotificationsIcon from '@material-ui/icons/Notifications';
import WorkIcon from '@material-ui/icons/Work';
import PagesIcon from '@material-ui/icons/Pages';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import TagFacesIcon from '@material-ui/icons/TagFaces';

import {styledTheme} from 'website/theme';

import {SideBar, SideBarItem} from '../../common';

import {OverviewSideHeader} from './@overview-side-header';

const {primaryColor} = styledTheme;

const Wrapper = styled.div`
  width: 300px;
`;

const SideBarWrapper = styled.div`
  margin-top: 40px !important;
  padding: 10px;
`;

const sideBarItems: SideBarItem[] = [
  {
    icon: <GroupIcon />,
    text: '我的组织',
    route: '/overview/organization',
    iconColor: primaryColor,
  },
  {
    icon: <TagFacesIcon />,
    text: '我的动态',
    route: '/overview/organization',
    iconColor: primaryColor,
  },
  {
    icon: <NotificationsIcon />,
    text: '我的通知',
    route: '/overview/messages',
    iconColor: primaryColor,
  },
  {
    icon: <PagesIcon />,
    text: '好友动态',
    route: '',
    iconColor: primaryColor,
  },
  {
    icon: <WorkIcon />,
    text: '待办事项',
    route: '/overview/todos',
    iconColor: primaryColor,
  },
  {
    icon: <CallMergeIcon />,
    text: '修正请求',
    route: '/overview/todos',
    iconColor: primaryColor,
  },
];

export class OverviewSide extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <OverviewSideHeader />
        <SideBarWrapper>
          <SideBar separateMargin="10px" items={sideBarItems} />
        </SideBarWrapper>
      </Wrapper>
    );
  }
}
