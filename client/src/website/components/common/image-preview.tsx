import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {isString} from '@wizardoc/shared';

import {isImage} from '../../utils';

export type onReadEnd = (dataUrl: string) => void;

interface ImagePreviewProps {
  file: File;
  onReadEnd?: onReadEnd;
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
        <Preview src={this.previewSrc} />
      </Wrapper>
    );
  }

  async componentDidMount(): Promise<void> {
    const {file, onReadEnd} = this.props;
    const dataURL = await parseFile2DataURL(file);

    if (onReadEnd && dataURL) {
      this.previewSrc = dataURL;

      onReadEnd(this.previewSrc);
    }
  }
}

export function parseFile2DataURL(file: File): Promise<string | undefined> {
  if (!isImage(file.type)) {
    throw new Error('The file MIME type must be png or jpg');
  }

  const fileReader = new FileReader();

  fileReader.readAsDataURL(file);

  return new Promise(resolve => {
    fileReader.addEventListener('loadend', () => {
      const {result} = fileReader;

      if (isString(result)) {
        // onReadEnd(result);
        resolve(result);
      }

      resolve(undefined);
    });
  });
}
