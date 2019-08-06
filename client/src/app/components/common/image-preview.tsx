import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {isImage} from '../../utils';

interface ImagePreviewProps {
  file: File;
  onReadEnd?(dataUrl: string): void;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Preview = styled.img`
  width: 100%;
  height: 100%;
`;

@observer
export class ImagePreview extends Component<ImagePreviewProps> {
  @observable
  previewSrc!: string;

  render(): ReactNode {
    return (
      <Wrapper>
        <Preview src={this.previewSrc}></Preview>
      </Wrapper>
    );
  }

  componentDidMount(): void {
    const {file, onReadEnd} = this.props;

    if (!isImage(file.type)) {
      throw new Error('The file MIME type must be png or jpg');
    }

    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.addEventListener('loadend', () => {
      const {result} = fileReader;

      if (typeof result === 'string') {
        this.previewSrc = result;

        if (onReadEnd) {
          onReadEnd(result);
        }
      }
    });
  }
}
