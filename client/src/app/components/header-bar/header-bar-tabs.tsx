import React, {Component, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import {Inject} from 'react-ts-di';

import {TabService} from 'src/app/services';

import {WizardTabConfig, WizardTab} from '../common';

const Wrapper = styled.div`
  flex-grow: 1;
  margin-left: 30px;
`;

@withRouter
export class HeaderBarTabs extends Component<Partial<RouteComponentProps>> {
  @Inject
  tabService!: TabService;

  tabConfigs: WizardTabConfig[] = [
    {
      text: '首页',
      route: '/home',
    },
    {
      text: '组织 & 规范',
      route: '/organization',
    },
    {
      text: 'PUBLIC SPACE',
      route: '/public-space',
    },
    {
      text: '关于',
      route: '/about',
    },
  ];

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
