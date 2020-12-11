export type PermissionSet = number[];

// permission values
export enum PermissionValues {
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
