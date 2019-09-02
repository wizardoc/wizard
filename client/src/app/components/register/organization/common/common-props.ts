import {OrganizationData} from '../organization';

export interface HandleProps {
  onOrganizationInfoChange(organizationData: OrganizationData): void;
}
