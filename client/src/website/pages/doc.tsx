import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {PageHeader} from '../components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

export class Doc extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <PageHeader title="文档"></PageHeader>
      </Wrapper>
    );
  }
}
