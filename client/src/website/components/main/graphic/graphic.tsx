import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {GraphicTitle, GraphicContent, GraphicImg} from './index';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1246px;
  margin: auto;
  padding: 120px 40px;
  overflow-x: hidden;
`;

const ContentContainter = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

export interface GraphicContentInfo {
  contentTitle: string;
  contentStandard: string;
  contentDesc: string;
}

interface GraphicProps {
  layout?: string;
  showRatio?: number;
  imgSrc: string;
  title?: string;
  contentInfo: GraphicContentInfo;
}

export class GraphicContainer extends Component<GraphicProps> {
  render(): ReactNode {
    const {
      layout = 'row',
      showRatio = 0, // >0图片可能会不出来
      contentInfo,
      imgSrc,
      title,
    } = this.props;
    const fadeInClass = 'fadeInUp'; // 除图片的入场 图片左右入场

    return (
      <Wrapper>
        <GraphicTitle fadeInClass={fadeInClass} title={title} showRatio={showRatio} />
        <ContentContainter
          style={{
            flexDirection: layout === 'row' ? 'row' : 'row-reverse',
          }}
        >
          <GraphicContent
            fadeInClass={fadeInClass}
            contentInfo={contentInfo}
            showRatio={showRatio}
          />
          <GraphicImg
            showRatio={showRatio}
            imgFadeInClass={layout === 'row' ? 'fadeInRight' : 'fadeInLeft'}
            graphicImg={imgSrc}
          />
        </ContentContainter>
      </Wrapper>
    );
  }
}
