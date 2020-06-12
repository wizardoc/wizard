import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import {FormElementComponentProps} from 'src/app/ui';
import {ImageUpload, parseFile2DataURL} from 'src/app/components/common';

export interface CategoryCoverUploadProps {}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.div`
  margin-right: 15px;
`;

const CoverSelector = styled.div`
  width: 150px;
  height: 150px;
  border: 1px dashed ${props => props.theme.dark};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;

  :hover {
    border-color: ${props => props.theme.primaryColor};

    > * {
      color: ${props => props.theme.primaryColor};
    }
  }
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: ${props => props.theme.white};
`;

@observer
export class CategoryCoverUpload extends Component<
  CategoryCoverUploadProps & Partial<FormElementComponentProps>
> {
  @observable
  previewSrc: string | undefined;

  handleReadEnd(file: File): void {
    const {onChange = (): void => {}} = this.props;

    parseFile2DataURL(file, dataURL => {
      this.previewSrc = dataURL;

      onChange(dataURL, file);
    });
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <Label>图片封面:</Label>
        <ImageUpload onAfterRead={file => this.handleReadEnd(file)}>
          <CoverSelector>
            {this.previewSrc && <PreviewImg src={this.previewSrc} />}
            <CameraAltIcon></CameraAltIcon>
          </CoverSelector>
        </ImageUpload>
      </Wrapper>
    );
  }
}
