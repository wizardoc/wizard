import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {OverviewDocsHeader} from 'src/app/components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  background: rgb(245, 245, 245);
  padding: 20px 40px 20px 70px;
  overflow: scroll;
`;

export class OverviewDocs extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <OverviewDocsHeader />
      </Wrapper>
    );
  }
}
