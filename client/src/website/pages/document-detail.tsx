import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Document} from '@wizardoc/shared';
import {RouteComponentProps} from 'react-router-dom';

import {
  MarkdownContent,
  FetchData,
  FetchDataComponentProps,
  MarkdownHeader,
  DocumentStatusBlock,
  DocumentComments,
} from '../components';
import {DocumentService} from '../services';

interface RouteParams {
  id: string;
}

const Wrapper = styled.div`
  background: ${props => props.theme.flatGray};
`;

@FetchData(
  ({extract}, props: RouteComponentProps<RouteParams>): Promise<Document> =>
    extract(DocumentService).detail(props.match.params.id),
)
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
