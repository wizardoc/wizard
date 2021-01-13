import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {SwitchBar, SwitchBarTabItem} from 'website/components';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${props => props.theme.shallowGrayBlue};
`;

const switchBarTabs: SwitchBarTabItem[] = [
  {name: '全部', route: '/document/center'},
  {name: '私有', route: '/document/'},
];

export class DocumentCenter extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <SwitchBar title="文档中心" tabs={switchBarTabs} />
      </Wrapper>
    );
  }
}
