import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Document} from '@wizardoc/shared';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import {DocumentService} from 'src/app/services';

import {FetchData} from '../../common';

import {DocumentListItem} from './@document-list-item';

export interface DocumentListProps {
  data: Document[];
}

const Wrapper = styled.div``;

@FetchData(({extract}) => extract(DocumentService).all())
@withRouter
export class DocumentList extends Component<
  Partial<DocumentListProps & RouteComponentProps>
> {
  handleDocumentListItemClick(id: string): void {
    this.props.history!.push(`/document/detail/${id}`);
  }

  render(): ReactNode {
    const {data} = this.props;
    const renderDocumentList = data!.map(doc => (
      <DocumentListItem
        onClick={() => this.handleDocumentListItemClick(doc.id)}
        document={doc}
        key={doc.id}
      />
    ));

    return <Wrapper>{renderDocumentList}</Wrapper>;
  }
}
