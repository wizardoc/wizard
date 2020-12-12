import {Injectable} from '@wizardoc/injector';
import {ResValueArea} from '@wizardoc/http-request';
import {Document, NewDocumentData} from '@wizardoc/shared';

import {HTTP} from '../http';

import {DocumentComment, CommentStatus} from './document-service.dto';
import {DocumentAPI} from './@document-service.api';

@Injectable()
export class DocumentService {
  constructor(private api: DocumentAPI, private http: HTTP) {}

  async create(document: NewDocumentData): Promise<ResValueArea> {
    const result = await this.http.post(this.api.new, document);

    return result.expect(() => '发布失败');
  }

  async detail(id: string): Promise<Document> {
    const result = await this.http.get(this.api.detail(id));

    return result.expect(() => '获取文档信息失败').data;
  }

  async fetchContent(link: string): Promise<string> {
    const result = await fetch(link);
    const data = await result.text();

    return data;
  }

  async addComment(
    documentID: string,
    content: string,
    reply?: string,
  ): Promise<ResValueArea<DocumentComment>> {
    const result = await this.http.post(this.api.newComment, {
      content,
      reply,
      documentID,
    });

    return result.expect(() => '评论失败，请检查网络后重试');
  }

  async fetchComments(
    documentID: string,
    page: number,
  ): Promise<ResValueArea<DocumentComment[]>> {
    const result = await this.http.get(this.api.comments(documentID), {page});

    return result.expect(() => '获取评论失败，请检查网络后重试');
  }

  async updateCommentStatus(
    commentID: string,
    operator: CommentStatus,
  ): Promise<ResValueArea> {
    const result = await this.http.put(this.api.updateComment, {
      commentID,
      operator,
    });

    return result.expect(() => '更新评论失败');
  }

  async all(): Promise<Document[]> {
    const result = await this.http.get(this.api.all);

    return result.expect(() => '获取文档失败').pipe(data => data ?? []).data;
  }
}
