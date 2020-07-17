import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Button} from '@material-ui/core';
import {Inject} from '@wizardoc/injector';

import {DocumentService} from 'src/app/services/document';

const Wrapper = styled.div`
  height: 65px;
  width: 100%;
`;

export class CreateDocumentHeader extends Component {
  @Inject
  documentService!: DocumentService;

  handlePublishClick(): void {
    this.documentService.create({
      title: 'Foo',
      cover:
        'http://travel.gosolo.top/1c142b2d01aa34e9a36bde480645a57fd69e14155dacfab5a3f9257b77fdc8d8%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202020-01-27%20%E4%B8%8B%E5%8D%887.00.34.png',
      path: 'http://travel.gosolo.top/about-wizard.md',
      organizationID: '8663e9b7-d6aa-462c-8fed-d714437a37a6',
      isPublic: false,
    });
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <Button variant="contained" onClick={() => this.handlePublishClick()}>
          发布
        </Button>
      </Wrapper>
    );
  }
}
