import React, {Component, ReactNode} from 'react';
import {Container, Card} from '@material-ui/core';
import styled from 'styled-components';
import {MarkdownEditor} from '@wizardoc/markdown';

import {CoverSelector} from './@cover-selector';

export interface CreateDocumentCardProps {
  close(): void;
}

const Wrapper = styled(Card)`
  width: 660px;
  height: 500px;
`;

export class CreateDocumentCard extends Component<CreateDocumentCardProps> {
  render(): ReactNode {
    return (
      <Container>
        <CoverSelector></CoverSelector>
        <Wrapper>
          <MarkdownEditor></MarkdownEditor>
        </Wrapper>
      </Container>
    );
  }
}
