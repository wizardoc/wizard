import React, {ReactNode, Component} from 'react';
import styled from 'styled-components';

import {CreateDocumentCard, CreateDocumentHeader} from '../components';

const Wrapper = styled.div``;

export class WritePage extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <CreateDocumentHeader />
        <CreateDocumentCard />
      </Wrapper>
    );
  }
}
