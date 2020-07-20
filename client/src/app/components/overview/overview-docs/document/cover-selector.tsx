import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {observable, observe} from 'mobx';
import {observer} from 'mobx-react';
import {Inject} from '@wizardoc/injector';

import {parseFile2DataURL} from 'src/app/components/common';
import {Upload} from 'src/app/ui';
import {UploadService} from 'src/app/services';

export interface CoverSelectorProps {
  onCoverSelected(url: string): void;
}

const Wrapper = styled.div`
  min-width: 660px;
  min-height: 192px;
  border: 1px dashed ${props => props.theme.black};
`;

@observer
export class CoverSelector extends Component<CoverSelectorProps> {
  @observable
  private viewCover: string | undefined;

  @Inject
  uploadService!: UploadService;

  async handleCoverAfterRead(file: File): Promise<void> {
    const baseURL = await parseFile2DataURL(file);

    this.viewCover = baseURL;

    const {url} = await this.uploadService.upload(file);

    this.props.onCoverSelected(url);
  }

  render(): ReactNode {
    return (
      <Upload onAfterRead={file => this.handleCoverAfterRead(file)}>
        <Wrapper>
          <img src={this.viewCover} alt="" />
        </Wrapper>
      </Upload>
    );
  }
}
