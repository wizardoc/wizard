import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {
  OrganizationDetailCardProps,
  OrganizationDetailCard,
} from './@organization-detail-card';
import {DocumentInfoBlock} from './@document-info-block';

interface FunctionPanelProps extends OrganizationDetailCardProps {}

const Wrapper = styled.div`
  margin-top: 20px;
`;

export class FunctionPanel extends Component<FunctionPanelProps> {
  render(): ReactNode {
    const {organizationInfo} = this.props;

    return (
      <Wrapper>
        <DocumentInfoBlock title="组织信息">
          <OrganizationDetailCard organizationInfo={organizationInfo} />
        </DocumentInfoBlock>
      </Wrapper>
    );
  }
}
