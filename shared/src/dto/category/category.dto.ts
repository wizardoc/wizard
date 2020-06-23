export interface Category {
  id: string;
  name: string;
  description: string;
  cover: string;
  createTime: number;
  lastModifyTime: number;
  createUser: string;
  organizationID: string;
}

export interface Categories {
  [organizationID: string]: Category[];
}
