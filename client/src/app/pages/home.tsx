import React, {Component, ReactNode} from 'react';
// tslint:disable-next-line:import-path-shallowest
import styled from 'styled-components';

import {RouterAnimation} from '../animations';
import {MainContent, Started, ViewBanner} from '../components';

const Wrapper = styled.div`
  width: 100%;
`;

class THome extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <Started />
        <MainContent />
        <ViewBanner
          title="基于组织的知识管理"
          description="团队的知识管理，享受历史追溯，Diff 通知，让更多博主收益其中。"
          actionButtons={[
            {text: '马上加入', primary: true, handler() {}},
            {text: '先去看看', handler() {}},
          ]}
        ></ViewBanner>
      </Wrapper>
    );
  }

  componentWillUpdate(): void {}
}

export const Home = RouterAnimation(THome);
