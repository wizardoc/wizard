import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode, createRef} from 'react';
import styled from 'styled-components';
import {findDOMNode} from 'react-dom';

import {WithDialog} from '../../../services';
import {ImagePreview} from '../../common';

import {Point, ScalableBox, BaseSize} from './scalable-box';

interface AvatarSelectorProps {
  file: File;
}

interface ClipData {
  start: Point;
  end: Point;
}

// interface ClipAvatarProps extends ClipData {}

const Wrapper = styled.div`
  position: relative;
`;

// const ClipAvatar = styled.img<ClipAvatarProps>`
//   clip: ${({start, end}) => `rect(${start.x}, ${start.y}, ${end.x}, ${end.y})`};
// `;

@observer
export class AvatarSelector extends Component<
  AvatarSelectorProps & WithDialog
> {
  @observable
  dataUrl: string = '';

  clipData: ClipData = {
    start: {x: 0, y: 0},
    end: {x: 0, y: 0},
  };

  @observable
  previewSize: BaseSize = {
    width: 0,
    height: 0,
  };
  previewRef = createRef<ImagePreview>();

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
        {/* <ClipAvatar src={this.dataUrl} {...this.clipData}></ClipAvatar> */}
        <ScalableBox
          previewSize={this.previewSize}
          img={this.dataUrl}
          onBlockMove={points => this.handleBlockMove(points)}
        />
        <ImagePreview
          ref={this.previewRef}
          onReadEnd={(dataUrl: string) => (this.dataUrl = dataUrl)}
          file={file}
        />
      </Wrapper>
    );
  }

  handleImagePreviewRefInit(ref: ImagePreview | null): void {
    if (!ref) {
      return;
    }

    const previewDOM = findDOMNode(ref) as HTMLDivElement;

    setTimeout(() => {
      const {offsetWidth: width, offsetHeight: height} = previewDOM;

      this.previewSize = {
        width,
        height,
      };
    });
  }

  componentDidMount(): void {
    const {current} = this.previewRef;

    if (!current) {
      return;
    }

    const previewDOM = findDOMNode(current) as HTMLDivElement;

    setTimeout(() => {
      const {
        clientWidth: width,
        clientHeight: height,
      } = previewDOM.parentElement as HTMLDivElement;

      this.previewSize = {
        width,
        height,
      };
    }, 1000);
  }
}
