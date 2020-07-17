import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Document} from '@wizardoc/shared';

import {
  MarkdownContent,
  FetchData,
  FetchDataComponentProps,
  MarkdownHeader,
  DocumentStatusBlock,
  DocumentComments,
} from '../components';
import {DocumentService} from '../services';

const Wrapper = styled.div`
  background: ${props => props.theme.flatGray};
`;

@FetchData(({extract}): Promise<Document> => extract(DocumentService).detail())
export class DocumentDetail extends Component<
  Partial<FetchDataComponentProps<Document>>
> {
  render(): ReactNode {
    const {data: document} = this.props;
    const {cover} = document!;

    return (
      <Wrapper>
        <MarkdownHeader cover={cover} />
        <MarkdownContent {...document!} />
        <DocumentStatusBlock />
        <DocumentComments />
      </Wrapper>
    );
  }
}
