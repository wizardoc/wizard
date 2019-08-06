import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {WithDialog} from '../../../services';
import {ImagePreview} from '../../common';

import {Point, ScalableBox} from './scalable-box';

interface AvatarSelectorProps {
  file: File;
}

interface ClipData {
  start: Point;
  end: Point;
}

interface ClipAvatarProps extends ClipData {}

const Wrapper = styled.div`
  position: relative;
`;

const ClipAvatar = styled.img<ClipAvatarProps>`
  clip: ${({start, end}) => `rect(${start.x}, ${start.y}, ${end.x}, ${end.y})`};
`;

@observer
export class AvatarSelector extends Component<
  AvatarSelectorProps & WithDialog
> {
  @observable
  dataUrl: string = '';

  @observable
  clipData: ClipData = {
    start: {x: 0, y: 0},
    end: {x: 0, y: 0},
  };

  handleBlockMove(points: Point[]): void {
    this.clipData = {
      start: points[0],
      end: points[3],
    };
  }

  render(): ReactNode {
    const {file} = this.props;

    return (
      <Wrapper>
        <ClipAvatar src={this.dataUrl} {...this.clipData}></ClipAvatar>
        <ScalableBox
          img={this.dataUrl}
          onBlockMove={points => this.handleBlockMove(points)}
        ></ScalableBox>
        <ImagePreview
          onReadEnd={(dataUrl: string) => (this.dataUrl = dataUrl)}
          file={file}
        ></ImagePreview>
      </Wrapper>
    );
  }
}
