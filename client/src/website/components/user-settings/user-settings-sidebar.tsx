import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import {SideBar, SideBarItem} from '../common';

const Wrapper = styled.div`
  width: 250px;
  border-right: 1px solid ${props => props.theme.shallowGray};
`;

const SideBarItems: SideBarItem[] = [
  {
    icon: <AssignmentIndIcon />,
    text: '基本信息',
    route: '/user/settings/base',
  },
  {
    icon: <MailOutlineIcon />,
    text: '邮箱设置',
    route: '/user/settings/email',
  },
  {
    icon: <PhonelinkSetupIcon />,
    text: '绑定手机',
    route: '/user/settings/phone',
  },
  {
    icon: <VpnKeyIcon />,
    text: '修改密码',
    route: '/user/settings/password',
  },
];

export class UserSettingsSidebar extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <SideBar highlight items={SideBarItems} />
      </Wrapper>
    );
  }
}
