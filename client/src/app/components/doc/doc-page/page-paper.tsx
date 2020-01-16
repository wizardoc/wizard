import React, {Component, ReactNode, ComponentType} from 'react';
import styled from 'styled-components';
import {Card} from '@material-ui/core';
import {CardProps} from '@material-ui/core/Card';

import {ColorBlock} from 'src/app/ui';
import {Time} from 'src/app/services';

import {MDRender} from '../../common';

export interface PagePaperProps {
  content: string;
  title: string;
  /** 传入 isMounted 来判断是否显示 colorBlock 动画，
   * 因为父组件可能希望在数据加载完成才显示动画，这时候的 isMounted将是异步的
   */
  isMounted?: boolean;
}

const Wrapper = styled.div``;

const ContentCard = styled(Card)`
  padding: 40px 50px 50px 50px;
  margin: 15px;
  position: relative;
` as ComponentType<CardProps>;

const Banner = styled.div`
  width: 100%;
  height: 500px;
  top: 48px;
  position: sticky;
  margin-bottom: -300px;
  overflow: hidden;
`;

const Title = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 300;
  color: white;
  position: relative;
  top: -150px;
`;

export class PagePaper extends Component<PagePaperProps> {
  render(): ReactNode {
    const {content, title, isMounted} = this.props;

    return (
      <Wrapper>
        <Banner>
          <ColorBlock
            isFull={!!isMounted}
            timeout={Time.Second * 1.5}
            color="#1976d2"
          >
            <Title>{title}</Title>
          </ColorBlock>
        </Banner>
        <ContentCard>
          <MDRender content={content}></MDRender>
        </ContentCard>
      </Wrapper>
    );
  }
}
