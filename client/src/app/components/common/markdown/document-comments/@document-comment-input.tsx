import React, {Component, ReactNode, ChangeEvent} from 'react';
import styled from 'styled-components';
import {Button, TextareaAutosize} from '@material-ui/core';
import {Inject} from '@wizardoc/injector';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import {Toast, DocumentService, DocumentComment} from 'src/app/services';

export interface DocumentCommentInputProps {
  reply?: string;
  documentID: string;
  onSubmitSuccess(comment: DocumentComment): void;
}

const Wrapper = styled.div`
  width: 690px;
  min-height: 50px;
  height: fit-content;
  background: ${props => props.theme.white};
  border-radius: 5px;
  box-shadow: ${props => props.theme.flatShadow};
  display: flex;
  padding: 0 0 0 15px;
  box-sizing: border-box;
`;

const StyledTextArea = styled(TextareaAutosize)`
  width: 100%;
  min-height: 50px;
  font-size: 15px !important;
  outline: none;
  border: none;
  padding: 15px 0;
  box-sizing: border-box;
  resize: none;
`;

const Submit = styled(Button)``;

@observer
export class DocumentCommentInput extends Component<DocumentCommentInputProps> {
  @Inject
  toast!: Toast;

  @Inject
  documentService!: DocumentService;

  @observable
  private commentContent: string = '';

  async handleSubmitClick(): Promise<void> {
    if (this.commentContent === '') {
      this.toast.error('评论内容不能为空哦～');

      return;
    }

    const {documentID, reply, onSubmitSuccess} = this.props;
    const result = await this.documentService.addComment(
      documentID,
      this.commentContent,
      reply,
    );

    result.success(data => {
      this.toast.success('评论成功！');
      this.commentContent = '';
      onSubmitSuccess(data!);
    });
  }

  handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    this.commentContent = e.target.value;
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <StyledTextArea
          value={this.commentContent}
          placeholder="留下您的评论吧"
          onChange={e => this.handleTextAreaChange(e)}
        />
        <Submit color="primary" onClick={() => this.handleSubmitClick()}>
          评论
        </Submit>
      </Wrapper>
    );
  }
}
