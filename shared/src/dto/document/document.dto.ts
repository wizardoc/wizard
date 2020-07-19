export interface RawDocument extends Omit<CommonDocumentFields, 'headings'> {
  categoryID?: string;
  organizationID: string;
  userID: string;
  headings: string;
}

export interface Document extends CommonDocumentFields {
  author: AuthorInfo;
  organizationInfo: OrganizationInfo;
}

export interface HeadingObject {
  level: number;
  content: string;
}

export interface NewDocumentData {
  content: string;
  headings: Headings;
  title: string;
  cover: string;
  categoryID?: string;
  organizationID: string;
  isPublic: boolean;
}

export type Headings = HeadingObject[];

interface CommonDocumentFields {
  createTime: number;
  lastModifyTime: number;
  contributors: undefined;
  readCount: number;
  commentCount: number;
  content: string;
  title: string;
  headings: Headings;
  cover: string;
  isPublic: boolean;
}

interface AuthorInfo {
  id: string;
  displayName: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  intro: string;
}

interface OrganizationInfo {
  id: string;
  ownerInfo: AuthorInfo;
  organizeName: string;
  description: string;
  hasValid: string;
  createTime: number;
  joinTime: number;
  members: AuthorInfo[];
  isOwner: boolean;
  permissions: PermissionValues[];
}

enum PermissionValues {
  // organization permissions
  ORG_DELETE,
  ORG_EDIT,
  ORG_INVITE,

  // category permissions
  CATEGORY_CREATE,
  CATEGORY_EDIT,

  // document permissions
  DOCUMENT_WRITE,
  DOCUMENT_READ,
  DOCUMENT_VIEW,
  DOCUMENT_DELETE,
  DOCUMENT_CREATE,
}
