import React, {Component, ReactNode} from 'react';
// tslint:disable-next-line:import-path-shallowest
import styled from 'styled-components';

import {RouterAnimation} from '../animations';
import {
  MainContent,
  Started,
  ViewBanner,
  GraphicContainer,
} from '../components';

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
        <GraphicContainer
          title="这里是标题"
          layout="row"
          contentInfo={{
            contentTitle: '深度集成和开放的平台定位',
            contentStandard: '标准化',
            contentDesc:
              '开放能力深入核心交互体验，自由扩展字段，流程，任务和报表; 通过 PowerApp 构建和分发行业解决方案。',
          }}
          imgSrc="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2037049550,1840264973&fm=26&gp=0.jpg"
        />
      </Wrapper>
    );
  }

  componentWillUpdate(): void {}
}

export const Home = RouterAnimation(THome);
