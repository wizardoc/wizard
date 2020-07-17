import React, {Component, ReactNode} from 'react';
import {Container, Card} from '@material-ui/core';
import styled from 'styled-components';
import {MarkdownEditor} from '@wizardoc/markdown';

import {CoverSelector} from './@cover-selector';

const EditorWrapper = styled(Card)`
  width: 660px;
  height: 500px;
`;

export class CreateDocumentCard extends Component {
  render(): ReactNode {
    return (
      <Container>
        <CoverSelector></CoverSelector>
        <EditorWrapper>
          <MarkdownEditor></MarkdownEditor>
        </EditorWrapper>
      </Container>
    );
  }
}
