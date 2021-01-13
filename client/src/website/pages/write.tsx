import 'reflect-metadata';

import React, {ReactNode, Component} from 'react';
import styled from 'styled-components';
import {MarkdownEditor} from '@wizardoc/markdown';
import {Inject} from '@wizardoc/injector';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {NewDocumentData} from '@wizardoc/shared';

import {
  CreateDocumentHeader,
  Container,
  CoverSelector,
  DocumentTitle,
  CreateDocumentDialog,
} from '../components';
import {MarkdownService, DialogService} from '../services';

interface RouteParams {
  id: string;
}

const Wrapper = styled.div``;

@withRouter
export class WritePage extends Component<Partial<RouteComponentProps<RouteParams>>> {
  @Inject
  markdownService!: MarkdownService;

  @Inject
  dialogService!: DialogService;

  documentData: NewDocumentData = {
    organizationID: this.props.match!.params.id,
    content: '',
    headings: [],
    title: '',
    isPublic: false,
    cover: '',
    excerpt: '',
  };

  handleCoverSelected(url: string): void {
    this.documentData.cover = url;
  }

  handleTitleSelected(title: string): void {
    this.documentData.title = title;
  }

  async handleContentChange(raw: string): Promise<void> {
    const {content, headings} = this.markdownService.renderToHTML(raw);

    this.documentData = {
      ...this.documentData,
      content,
      headings,
      excerpt: raw.slice(0, 100),
    };
  }

  handlePublishClick(): void {
    this.dialogService.open(CreateDocumentDialog, {
      title: '创建文档',
      componentProps: {
        documentData: this.documentData,
      },
    });
  }

  render(): ReactNode {
    return (
      <Container>
        <CreateDocumentHeader onPublishClick={() => this.handlePublishClick()} />
        <CoverSelector onCoverSelected={url => this.handleCoverSelected(url)} />
        <DocumentTitle onTitleSelected={title => this.handleTitleSelected(title)} />
        <MarkdownEditor onContentChange={content => this.handleContentChange(content)} />
      </Container>
    );
  }
}
