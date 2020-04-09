import {UserBaseInfo} from '../user';

export interface OrganizationCardData extends UserBaseInfo {
  ownerInfo: UserBaseInfo;
  organizeName: string;
  description: string;
  hasValid: string;
  createTime: number;
  joinTime: number;
}

export interface OrganizationNames {
  organizeNames: string[];
}

export interface AllOrganization {
  organizations: OrganizationCardData[];
}
