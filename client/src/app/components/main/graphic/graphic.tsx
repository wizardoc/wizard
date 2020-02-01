import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {GraphicTitle} from './graphic-title';
import {GraphicContent} from './graphic-content';
import {GraphicImg} from './graphic-img';

export interface GraphicContentInfo {
  contentTitle: string;
  contentStandard: string;
  contentDesc: string;
}

interface GraphicProps extends ContentContainerProps {
  imgSrc: string;
  title?: string;
  contentInfo: GraphicContentInfo;
}

interface ContentContainerProps {
  layout?: 'row' | 'row-reverse';
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1246px;
  margin: auto;
  padding: 120px 40px;
  overflow-x: hidden;
`;

const ContentContainer = styled.div<ContentContainerProps>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: ${props => props.layout || 'row'};
`;

export class GraphicContainer extends Component<GraphicProps> {
  render(): ReactNode {
    const {contentInfo, imgSrc, title, layout} = this.props;

    return (
      <Wrapper>
        <GraphicTitle title={title} />
        <ContentContainer layout={layout}>
          <GraphicContent contentInfo={contentInfo} />
          <GraphicImg graphicImg={imgSrc} />
        </ContentContainer>
      </Wrapper>
    );
  }
}
