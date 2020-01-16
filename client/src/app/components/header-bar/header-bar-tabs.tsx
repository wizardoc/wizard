import React, {Component, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import {Inject} from 'react-ts-di';

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
      text: '为什么使用 Wizard',
      route: '/why-use',
    },
    {
      text: 'PUBLIC SPACE',
      route: '/public-space',
    },
    {
      text: '帮助中心',
      route: '/help',
    },
    {
      text: '关于我们',
      route: '/about',
    },
  ];

  loginTabConfigs: WizardTabConfig[] = [
    // {
    //   text: '组织',
    //   route: '/organizations',
    // },
    // {
    //   text: '文档',
    //   route: '/documents',
    // },
    // {
    //   text: '动态广场',
    //   route: '/activity-piazza',
    // },
    // {
    //   text: '关于',
    //   route: '/about',
    // },
    // {
    //   text: '帮助中心',
    //   route: '/help',
    // },
    {
      text: '关于我们',
      route: '/about',
    },
  ];

  get tabConfigs(): WizardTabConfig[] {
    return this.userService.isLogin
      ? this.loginTabConfigs
      : this.initTabConfigs;
  }

  constructor(props: Partial<RouteComponentProps>) {
    super(props);

    this.tabService.updatePage(props.location!.pathname);
  }

  handleTabChange(config: WizardTabConfig): void {
    this.tabService.updatePage(config.route!);
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <WizardTab
          tabs={this.tabConfigs}
          onTabChange={config => this.handleTabChange(config)}
        />
      </Wrapper>
    );
  }
}
