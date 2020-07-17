import {UserModel} from '../user';

export interface NewDocumentData {
  path: string;
  title: string;
  cover: string;
  categoryID?: string;
  organizationID: string;
  isPublic: boolean;
}

export interface DocumentComment {
  id: string;
  content: string;
  reply: string;
  createTime: number;
  up: number;
  down: number;
  user: UserModel;
  status: CommentStatus;
  documentID: string;
}

export enum CommentStatus {
  UP,
  DOWN,
  NONE,
}
