import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {
  GraphicContentTitle,
  GraphicContentStandard,
  GraphicContentDesc,
} from './index';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 540px;
`;

interface GraphicContentProps {
  showRatio: number;
  fadeInClass: string;
  contentObj: {
    contentTitle: string;
    contentStandard: string;
    contentDesc: string;
  };
}

export class GraphicContent extends Component<GraphicContentProps> {
  render(): ReactNode {
    const {showRatio, contentObj, fadeInClass} = this.props;

    return (
      <Wrapper>
        <GraphicContentTitle
          fadeInClass={fadeInClass}
          showRatio={showRatio}
          contentTitle={contentObj.contentTitle}
        />
        <GraphicContentStandard
          fadeInClass={fadeInClass}
          showRatio={showRatio}
          contentStandard={contentObj.contentStandard}
        />
        <GraphicContentDesc
          fadeInClass={fadeInClass}
          showRatio={showRatio}
          contentDesc={contentObj.contentDesc}
        />
      </Wrapper>
    );
  }
}
