import React, {Component, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import {Inject} from '@wizardoc/injector';
import {Button} from '@material-ui/core';

import {TabService, User} from 'src/app/services';

import {WizardTabConfig} from '../common';

const TabButton = styled(Button)`
  color: ${props => props.theme.white} !important;
`;

const Wrapper = styled.div`
  flex-grow: 1;
  margin-left: 30px;
`;

const TabConfigs: WizardTabConfig[] = [
  {
    text: '首页',
    route: '/home',
  },
  {
    text: '社区',
    route: '/community',
  },
  {
    text: '文档中心',
    route: '/document-center',
  },
  {
    text: '帮助中心',
    route: '/team/help',
  },
  {
    text: '关于我们',
    route: '/team/about',
  },
];

@withRouter
export class HeaderBarTabs extends Component<Partial<RouteComponentProps>> {
  @Inject
  tabService!: TabService;

  @Inject
  userService!: User;

  render(): ReactNode {
    const renderTabs = TabConfigs.map(tab => <TabButton>{tab.text}</TabButton>);

    return <Wrapper>{renderTabs}</Wrapper>;
  }
}
