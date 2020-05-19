import React, {Component, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import {Inject} from '@wizardoc/injector';

import {TabService, User} from 'src/app/services';

import {WizardTabConfig, WizardTab} from '../common';

const Wrapper = styled.div`
  flex-grow: 1;
  margin-left: 30px;
`;

@withRouter
export class HeaderBarTabs extends Component<Partial<RouteComponentProps>> {
  @Inject
  tabService!: TabService;

  @Inject
  userService!: User;

  initTabConfigs: WizardTabConfig[] = [
    {
      text: '首页',
      route: '/home',
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

  render(): ReactNode {
    return (
      <Wrapper>
        <WizardTab tabs={this.initTabConfigs} />
      </Wrapper>
    );
  }
}
