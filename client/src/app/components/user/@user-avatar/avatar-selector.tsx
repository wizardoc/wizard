import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode, createRef} from 'react';
import styled from 'styled-components';
import {findDOMNode} from 'react-dom';

import {DialogComponentProps} from 'src/app/services';

import {ImagePreview} from '../../common';

import {Point, ScalableBox, BaseSize} from './scalable-box';

interface AvatarSelectorProps {
  file: File;
}

const Wrapper = styled.div`
  position: relative;
`;

@observer
export class AvatarSelector extends Component<
  AvatarSelectorProps & Partial<DialogComponentProps>
> {
  @observable
  dataUrl: string = '';

  @observable
  previewSize: BaseSize = {
    width: 0,
    height: 0,
  };
  previewRef = createRef<ImagePreview>();

  handleBlockMove(points: Point[]): void {
    this.props.close!(points);
  }

  render(): ReactNode {
    const {file} = this.props;

    return (
      <Wrapper>
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
