import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Button} from '@material-ui/core';
import StarRateIcon from '@material-ui/icons/StarRate';

import {WizardTab, WizardTabConfig} from '../../common';

const Wrapper = styled.div`
  padding: 0 10px 0 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GitHubButton = styled(Button)`
  height: 35px !important;
`;

const HeaderTabs: WizardTabConfig[] = [
  {text: '概览', route: '/overview'},
  {text: '知识共享', route: '/knowledge'},
];

export class OverviewHeader extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <WizardTab tabs={HeaderTabs} />
        <GitHubButton variant="outlined" color="primary">
          <StarRateIcon />
          贡献 Wizardoc
        </GitHubButton>
      </Wrapper>
    );
  }
}
