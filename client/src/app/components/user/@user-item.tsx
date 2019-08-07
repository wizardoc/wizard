import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {ListItemIconProps} from '@material-ui/core/ListItemIcon';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import FaceIcon from '@material-ui/icons/Face';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import React, {
  Component,
  ComponentType,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {Toast, User} from '../../services';
import {ProfileStore} from '../../store';
import {InjectStore} from '../../utils';

interface ItemMode {
  mode?: 'normal' | 'danger';
}

interface SettingItem extends ItemMode {
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

interface UserItemProps extends RouteComponentProps {}

const Wrapper = styled.div``;

const PrimaryListItemIcon = styled(ListItemIcon)<PrimaryListItemIconProps>`
  color: ${({mode, theme}) =>
    mode === 'danger' ? theme.secondaryColor : theme.primaryColor} !important;
` as ComponentType<ListItemIconProps & PrimaryListItemIconProps>;

class TUserItem extends Component<UserItemProps> {
  @Inject
  private toast!: Toast;

  @Inject
  private userService!: User;

  @InjectStore(ProfileStore)
  private profileStore!: ProfileStore;

  private userItems: SettingItem[] = [
    {
      icon: <FaceIcon></FaceIcon>,
      text: '个人中心',
      route: '/',
    },
    {
      icon: <SupervisorAccountIcon></SupervisorAccountIcon>,
      text: '我的组织',
      route: '/',
    },
    {
      icon: <ChromeReaderModeIcon></ChromeReaderModeIcon>,
      text: '管理文档',
      route: '/',
    },
  ];

  private systemItems: SettingItem[] = [
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

  private dangerItems: SettingItem[] = [
    {
      icon: <InfoIcon></InfoIcon>,
      text: '退出登录',
      route: '/',
      mode: 'danger',
      onClick: () => {
        this.userService.logout();
        this.toast.success('退出登录成功');
      },
    },
  ];

  render(): ReactNode {
    const {history} = this.props;

    const Items: FunctionComponent<ItemsProps> = props => (
      <List>
        {props.data.map(({icon, text, route, mode, onClick = () => {}}) => (
          <ListItem
            key={text}
            button
            onClick={(): void => {
              this.profileStore.toggleViewProfilePanel();
              history.push(route);
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
        <Items data={this.userItems}></Items>
        <Divider></Divider>
        <Items data={this.systemItems}></Items>
        <Divider></Divider>
        <Items data={this.dangerItems}></Items>
      </Wrapper>
    );
  }
}

export const UserItem = withRouter(TUserItem);
