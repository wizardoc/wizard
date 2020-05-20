export interface Category {
  id: string;
  name: string;
  description: string;
  cover: string;
  createTime: number;
  lastModifyTime: number;
}

export interface Categories {
  [organizationID: string]: Category;
}
