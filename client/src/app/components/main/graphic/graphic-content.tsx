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

interface GraphicContentProps {
  contentInfo: GraphicContentInfo;
}

export class GraphicContent extends Component<GraphicContentProps> {
  render(): ReactNode {
    const {contentInfo} = this.props;

    return (
      <Wrapper>
        <GraphicContentTitle contentTitle={contentInfo.contentTitle} />
        <GraphicContentStandard contentStandard={contentInfo.contentStandard} />
        <GraphicContentDesc contentDesc={contentInfo.contentDesc} />
      </Wrapper>
    );
  }
}
