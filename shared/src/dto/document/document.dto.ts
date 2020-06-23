export interface RawDocument extends CommonDocumentFields {
  categoryID?: string;
  organizationID: string;
  userID: string;
}

export interface Document extends CommonDocumentFields {
  author: AuthorInfo;
  organizationInfo: OrganizationInfo;
}

interface CommonDocumentFields {
  createTime: number;
  lastModifyTime: number;
  contributors: undefined;
  readCount: number;
  commentCount: number;
  path: string;
  title: string;
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
