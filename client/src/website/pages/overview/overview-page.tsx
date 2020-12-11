import React, {ReactNode, Component} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';

import {Breadcrumbs, BreadcrumbsRules} from 'website/ui';
import {withTheme, ThemeComponentProps} from 'website/theme';

import {OverviewSide, OverviewHeader} from '../../components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ViewPlace = styled(Wrapper)`
  flex-direction: column;
`;

const BreadcrumbsWrapper = styled.div`
  height: 42px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  background: ${props => props.theme.white};
  padding: 0 70px;
  z-index: 1;
  box-shadow: ${props => props.theme.shallowShadow};
  border-top: 1px solid #eeeeee;
`;

const breadcrumbsRules: BreadcrumbsRules = {
  '/overview': {
    text: '概览',
  },
  '/overview/messages': {
    text: '消息中心',
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
          <OverviewHeader />
          <BreadcrumbsWrapper>
            <Breadcrumbs
              rules={breadcrumbsRules}
              activeColor={theme!.black}
              staticColor={theme!.deepFlatGray}
            />
          </BreadcrumbsWrapper>
          {this.props.children}
        </ViewPlace>
      </Wrapper>
    );
  }
}
