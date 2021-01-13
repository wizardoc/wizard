import React, {ChangeEvent, Component, ReactNode, createRef} from 'react';
import styled from 'styled-components';

interface FileInputable {
  files: FileList;
  value: unknown;
}

export interface UploadProps {
  onAfterRead(file: File): void;
}

const Wrapper = styled.div``;

const UploadInput = styled.input`
  display: none;
`;

export class Upload extends Component<UploadProps> {
  private uploadRef = createRef<HTMLInputElement>();

  handleUploadChange({target}: ChangeEvent): void {
    const {onAfterRead} = this.props;
    const fileInputable = (target as unknown) as FileInputable;
    const {files} = fileInputable;
    const file = files[0];

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
        />
        <div onClick={() => this.handleUploadBodyClick()}>{children}</div>
      </Wrapper>
    );
  }
}
