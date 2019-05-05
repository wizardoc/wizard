import {Tab} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styled from 'styled-components';

import {TABS_CONFIG} from '../constant';
import {MainTabs} from '../store';
import {InjectStore} from '../utils';

const Wrapper = styled.div`
  flex-grow: 1;
  margin-left: 30px;
`;

@observer
export class THeaderBarTabs extends Component<RouteComponentProps> {
  @InjectStore(MainTabs)
  private mainTabs!: MainTabs;

  handleTabChange(_event: React.ChangeEvent<{}>, value: number): void {
    this.mainTabs.tabTag = value;
    this.props.history.push(TABS_CONFIG[value]);
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <Tabs
          value={this.mainTabs.tabTag}
          onChange={(event, value) => this.handleTabChange(event, value)}
          indicatorColor="secondary"
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
