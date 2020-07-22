import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {ListItemIconProps} from '@material-ui/core/ListItemIcon';
import FaceIcon from '@material-ui/icons/Face';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import GroupIcon from '@material-ui/icons/Group';
import DescriptionIcon from '@material-ui/icons/Description';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import SettingsIcon from '@material-ui/icons/Settings';
import React, {
  Component,
  ComponentType,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {extract, Inject} from '@wizardoc/injector';
import styled from 'styled-components';
import MessageIcon from '@material-ui/icons/Message';

import {Toast, User, DrawerService} from '../../services';

interface ItemMode {
  mode?: 'normal' | 'danger';
}

export interface SettingItem extends ItemMode {
  icon: ReactElement;
  text: string;
  route: string;
  mode?: 'normal' | 'danger';
  onClick?(): void;
}

interface ItemsProps {
  data: SettingItem[];
}

interface PrimaryListItemIconProps extends ItemMode {
  mode?: 'normal' | 'danger';
}

interface UserItemProps {}

const Wrapper = styled.div``;

export const userItems: SettingItem[] = [
  {
    icon: <FaceIcon></FaceIcon>,
    text: '个人中心',
    route: '/user/settings',
  },
  {
    icon: <MessageIcon></MessageIcon>,
    text: '消息中心',
    route: '/message',
  },
  {
    icon: <GroupIcon></GroupIcon>,
    text: '我的组织',
    route: '/',
  },
  {
    icon: <DescriptionIcon></DescriptionIcon>,
    text: '我的文章 & 文档',
    route: '/',
  },
  {
    icon: <BookmarkIcon></BookmarkIcon>,
    text: '我的收藏',
    route: '/',
  },
  {
    icon: <CallMergeIcon></CallMergeIcon>,
    text: '我的合并请求',
    route: '/',
  },
];

export const systemItems: SettingItem[] = [
  {
    icon: <HelpIcon></HelpIcon>,
    text: '帮助',
    route: '/',
  },
  {
    icon: <SettingsIcon></SettingsIcon>,
    text: '设置',
    route: '/',
  },
];

export const dangerItems: SettingItem[] = [
  {
    icon: <InfoIcon></InfoIcon>,
    text: '退出登录',
    route: '/',
    mode: 'danger',
    onClick: () => {
      extract(User).logout();
      extract(Toast).success('退出登录成功');
    },
  },
];

const PrimaryListItemIcon = styled(ListItemIcon)<PrimaryListItemIconProps>`
  color: ${({mode, theme}) =>
    mode === 'danger' ? theme.secondaryColor : theme.primaryColor} !important;
` as ComponentType<ListItemIconProps & PrimaryListItemIconProps>;

@withRouter
export class UserItem extends Component<
  UserItemProps & Partial<RouteComponentProps>
> {
  @Inject
  drawerService!: DrawerService;

  render(): ReactNode {
    const {history} = this.props;

    const Items: FunctionComponent<ItemsProps> = props => (
      <List>
        {props.data.map(({icon, text, route, mode, onClick = () => {}}) => (
          <ListItem
            key={text}
            button
            onClick={(): void => {
              history!.push(route);
              this.drawerService.hidden();
              onClick();
            }}
          >
            <PrimaryListItemIcon mode={mode}>{icon}</PrimaryListItemIcon>
            <ListItemText primary={text}></ListItemText>
          </ListItem>
        ))}
      </List>
    );

    return (
      <Wrapper>
        <Divider></Divider>
        <Items data={userItems}></Items>
        <Divider></Divider>
        <Items data={systemItems}></Items>
        <Divider></Divider>
        <Items data={dangerItems}></Items>
      </Wrapper>
    );
  }
}
