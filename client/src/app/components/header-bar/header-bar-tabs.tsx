import {Tab} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styled from 'styled-components';

import {TABS_CONFIG} from '../../constant';
import {MainTabs, UIControl} from '../../store';
import {InjectStore} from '../../utils';

const Wrapper = styled.div`
  flex-grow: 1;
  margin-left: 30px;
`;

@observer
export class THeaderBarTabs extends Component<RouteComponentProps> {
  @InjectStore(MainTabs)
  private mainTabs!: MainTabs;

  @InjectStore(UIControl)
  private uiControl!: UIControl;

  handleTabChange(value: number): void {
    this.mainTabs.tabTag = value;
    this.props.history.push(TABS_CONFIG[value]);
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <Tabs
          value={this.mainTabs.tabTag}
          onChange={(_event, value) => this.handleTabChange(value)}
          indicatorColor="secondary"
        >
          <Tab label="首页" />
          <Tab label="组织规范" />
          <Tab label="Public space" />
          <Tab label="关于" />
        </Tabs>
      </Wrapper>
    );
  }

  componentDidMount(): void {
    const {pathname} = this.props.location;

    this.mainTabs.tabTag = TABS_CONFIG[pathname] || TABS_CONFIG['/home'];
    this.uiControl.updatePage(pathname);
  }
}

export const HeaderBarTabs = withRouter(THeaderBarTabs);
