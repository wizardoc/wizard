import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {
  GraphicContentTitle,
  GraphicContentStandard,
  GraphicContentDesc,
} from './index';
import {GraphicContentInfo} from './graphic';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 540px;
`;

export interface GraphicAnimation {
  showRatio: number;
  fadeInClass: string;
}

interface GraphicContentProps extends GraphicAnimation {
  contentInfo: GraphicContentInfo;
}

export class GraphicContent extends Component<GraphicContentProps> {
  render(): ReactNode {
    const {showRatio, contentInfo, fadeInClass} = this.props;

    return (
      <Wrapper>
        <GraphicContentTitle
          fadeInClass={fadeInClass}
          showRatio={showRatio}
          contentTitle={contentInfo.contentTitle}
        />
        <GraphicContentStandard
          fadeInClass={fadeInClass}
          showRatio={showRatio}
          contentStandard={contentInfo.contentStandard}
        />
        <GraphicContentDesc
          fadeInClass={fadeInClass}
          showRatio={showRatio}
          contentDesc={contentInfo.contentDesc}
        />
      </Wrapper>
    );
  }
}
