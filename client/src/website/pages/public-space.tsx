import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {PageHeader} from '../components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

export class PublicSpace extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <PageHeader title="PUBLIC SPACE" />
      </Wrapper>
    );
  }
}
