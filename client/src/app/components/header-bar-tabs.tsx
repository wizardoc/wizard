import {Tab} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import React, {Component, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styled from 'styled-components';

import {TABS_CONFIG} from '../constant';
import {MainTabs} from '../store';
import {InjectStore} from '../utils';

const Wrapper = styled.div``;

export class THeaderBarTabs extends Component<RouteComponentProps> {
  @InjectStore(MainTabs)
  private mainTabs!: MainTabs;

  handleTabChange(_event: React.ChangeEvent<{}>, value: number): void {
    this.props.history.push(TABS_CONFIG[value]);
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <Tabs
          value={this.mainTabs.tabTag}
          onChange={(event, value) => this.handleTabChange(event, value)}
        >
          <Tab label="首页" />
          <Tab label="规范" />
          <Tab label="关于" />
        </Tabs>
      </Wrapper>
    );
  }
}

export const HeaderBarTabs = withRouter(THeaderBarTabs);
