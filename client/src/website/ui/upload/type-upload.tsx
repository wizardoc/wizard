import React, {Component, ReactNode} from 'react';
import {Inject} from '@wizardoc/injector';

import {MIMEType} from 'website/utils';
import {Toast} from 'website/services';

import {UploadProps, Upload} from './upload';

export interface TypeUploadProps extends UploadProps {
  allowMIMETypes: MIMEType[];
}

export class TypeUpload extends Component<TypeUploadProps> {
  @Inject
  toast!: Toast;

  handleFileRead(file?: File): void {
    if (!file) {
      return;
    }

    const {allowMIMETypes, onAfterRead} = this.props;

    if (!allowMIMETypes.includes(file.type as MIMEType)) {
      this.toast.error(`不支持的上传类型`);

      return;
    }

    onAfterRead(file);
  }

  render(): ReactNode {
    return (
      <Upload onAfterRead={file => this.handleFileRead(file)}>
        {this.props.children}
      </Upload>
    );
  }
}
