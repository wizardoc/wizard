import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {RouteComponentProps} from 'react-router-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {Inject} from '@wizardoc/injector';

import {
  DocumentService,
  DocumentComment,
  CommentStatus,
} from 'src/app/services';

import {FetchData} from '../../loading';

import {DocumentCommentInput} from './@document-comment-input';
import {DocumentCommentItem} from './@document-comment-item';

export interface DocumentCommentsProps {
  data?: FetchDataPayload;
}

interface RouteParams {
  id: string;
}

interface FetchDataPayload {
  documentID: string;
  comments: DocumentComment[];
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 150px;
`;

const Comments = styled.div``;

@FetchData(async (injector, props: RouteComponentProps<RouteParams>) => {
  const documentID = props.match.params.id;
  const result = await injector
    .extract(DocumentService)
    .fetchComments(documentID, 1);

  return {
    documentID,
    comments: result.data,
  };
})
@observer
export class DocumentComments extends Component<DocumentCommentsProps> {
  @observable
  private comments: DocumentComment[];

  @Inject
  documentService!: DocumentService;

  constructor(props: DocumentCommentsProps) {
    super(props);

    this.comments = props.data!.comments;
  }

  handleCommentSubmitSuccess(comment: DocumentComment): void {
    this.comments.push(comment);
  }

  handleCommentUpDownClick(commentID: string, status: CommentStatus): void {
    this.documentService.updateCommentStatus(commentID, status);
  }

  render(): ReactNode {
    const {documentID} = this.props.data!;
    const renderComments = this.comments.map(comment => (
      <DocumentCommentItem
        onUpDownClick={status =>
          this.handleCommentUpDownClick(comment.id, status)
        }
        key={comment.id}
        commentInfo={comment}
      />
    ));

    return (
      <Wrapper>
        <DocumentCommentInput
          onSubmitSuccess={comment => this.handleCommentSubmitSuccess(comment)}
          documentID={documentID}
        />
        <Comments>{renderComments}</Comments>
      </Wrapper>
    );
  }
}
