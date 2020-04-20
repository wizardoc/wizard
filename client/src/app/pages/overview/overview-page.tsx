import React, {ReactNode, Component} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';

import {Breadcrumbs, BreadcrumbsRules} from 'src/app/ui';
import {withTheme, ThemeComponentProps} from 'src/app/theme';

import {OverviewSide} from '../../components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ViewPlace = styled(Wrapper)`
  flex-direction: column;
`;

const BreadcrumbsWrapper = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  background: ${props => props.theme.coffeeGray};
  padding: 0 70px;
  z-index: 1;
`;

const breadcrumbsRules: BreadcrumbsRules = {
  '/overview': {
    text: '概览',
    isActive: false,
  },
  '/overview/organization': {
    text: '组织概览',
  },
  '/overview/organization/edit': {
    text: '编辑组织',
  },
  '/overview/organization/docs': {
    text: '文档概览',
  },
};

@withTheme
@observer
export class OverviewPage extends Component<Partial<ThemeComponentProps>> {
  render(): ReactNode {
    const {theme} = this.props;

    return (
      <Wrapper>
        <OverviewSide />
        <ViewPlace>
          <BreadcrumbsWrapper>
            <Breadcrumbs
              rules={breadcrumbsRules}
              activeColor={theme!.white}
              staticColor={theme!.white}
              divisionColor={theme!.white}
            />
          </BreadcrumbsWrapper>
          {this.props.children}
        </ViewPlace>
      </Wrapper>
    );
  }
}
