import React, {ChangeEvent, Component, ReactNode, createRef} from 'react';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {Toast} from '../services';
import {isImage} from '../utils';

interface FileInputable {
  files: FileList;
  value: unknown;
}

interface UploadProps {
  onAfterRead(file: File): void;
}

const Wrapper = styled.div``;

const UploadInput = styled.input`
  display: none;
`;

export class Upload extends Component<UploadProps> {
  @Inject
  private toast!: Toast;

  private uploadRef = createRef<HTMLInputElement>();

  handleUploadChange({target}: ChangeEvent): void {
    const {onAfterRead} = this.props;
    const fileInputable = (target as unknown) as FileInputable;
    const {files} = fileInputable;
    const file = files[0];
    const {type} = file;

    if (!isImage(type)) {
      this.toast.error('请上传 png/ jpg 格式的头像');
      fileInputable.value = '';

      return;
    }

    onAfterRead(file);
  }

  handleUploadBodyClick(): void {
    const {current} = this.uploadRef;

    if (!current) {
      return;
    }

    current.click();
  }

  render(): ReactNode {
    const {children} = this.props;

    return (
      <Wrapper>
        <UploadInput
          type="file"
          ref={this.uploadRef}
          onChange={(e: ChangeEvent) => this.handleUploadChange(e)}
        ></UploadInput>
        <div onClick={() => this.handleUploadBodyClick()}>{children}</div>
      </Wrapper>
    );
  }
}
