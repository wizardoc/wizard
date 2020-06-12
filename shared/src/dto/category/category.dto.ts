export interface Category {
  id: string;
  name: string;
  description: string;
  cover: string;
  createTime: number;
  lastModifyTime: number;
  userID: string;
}

export interface Categories {
  [organizationID: string]: Category;
}
