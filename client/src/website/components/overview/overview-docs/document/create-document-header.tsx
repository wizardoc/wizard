import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Button} from '@material-ui/core';
import {Inject} from '@wizardoc/injector';

import {DocumentService} from 'website/services/document';

export interface CreateDocumentHeaderProps {
  onPublishClick(): void;
}

const Wrapper = styled.div`
  height: 65px;
  width: 100%;
`;

export class CreateDocumentHeader extends Component<CreateDocumentHeaderProps> {
  @Inject
  documentService!: DocumentService;

  render(): ReactNode {
    const {onPublishClick} = this.props;

    return (
      <Wrapper>
        <Button variant="contained" onClick={() => onPublishClick()}>
          发布
        </Button>
      </Wrapper>
    );
  }
}
