import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {colorGenerator} from '../utils';

interface BlockProps {
  isFull: boolean;
  /** use random rgb value if color is undefined */
  color?: string;
  timeout?: number;
}

interface WrapperProps {
  layer?: number;
}

export interface ColorBlockProps extends BlockProps, WrapperProps {
  /** whether viewer is display */
  isCover?: boolean;
}

const FullScreen = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
`;

const Wrapper = styled(FullScreen)<WrapperProps>`
  overflow: hidden;
  transition: 0.3s all;

  z-index: ${props => props.layer};
`;

const Block = styled.div<BlockProps>`
  width: ${props => (props.isFull ? '110%' : 0)};
  height: ${props => (props.isFull ? '110%' : 0)};
  padding: ${props => (props.isFull ? '110%' : 0)};
  border-radius: 1000px;
  background-color: ${props => props.color};
  transition: ${props => props.timeout}s all;
`;

const ViewerWrapper = styled(FullScreen)<WrapperProps>`
  z-index: ${props => props.layer};
`;

export class ColorBlock extends Component<ColorBlockProps> {
  render(): ReactNode {
    const {
      isFull,
      color = colorGenerator(),
      layer = 1,
      timeout = 300,
      isCover = false,
    } = this.props;
    const viewerLayer = isCover ? layer - 1 : layer + 1;

    return (
      <>
        <Wrapper layer={layer}>
          <Block isFull={isFull} color={color} timeout={timeout / 1000}></Block>
        </Wrapper>
        <ViewerWrapper layer={viewerLayer}>{this.props.children}</ViewerWrapper>
      </>
    );
  }
}
