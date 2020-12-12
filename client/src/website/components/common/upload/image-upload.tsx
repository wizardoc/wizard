import React, {Component, ReactNode} from 'react';

import {UploadProps, TypeUpload} from 'website/ui';
import {MIME, MIMEType} from 'website/utils';

export interface ImageUploadProps extends UploadProps {}

export class ImageUpload extends Component<ImageUploadProps> {
  render(): ReactNode {
    return (
      <TypeUpload
        allowMIMETypes={[MIME.JPEG, MIME.JPG, MIME.PNG] as MIMEType[]}
        {...this.props}
      >
        {this.props.children}
      </TypeUpload>
    );
  }
}
