import {UserBaseInfo} from '../user';
import {PermissionValues} from '../permission';

export interface OrganizationCardData {
  id: string;
  ownerInfo: UserBaseInfo;
  organizeName: string;
  description: string;
  hasValid: string;
  createTime: number;
  joinTime: number;
  members: UserBaseInfo[];
  isOwner: boolean;
  permissions: PermissionValues[];
}

export interface OrganizationNames {
  organizeNames: string[];
}

export interface AllOrganization {
  organizations: OrganizationCardData[];
}
