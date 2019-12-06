import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {PenHeader} from './pen-header';
import {Original} from './original';
// import {Viewer} from './viewer';

const Wrapper = styled.div``;

const EditorWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;

const Widget = styled.div`
  flex: 1;
  height: fit-content;
`;

export class Pen extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <PenHeader></PenHeader>
        <EditorWrapper>
          <Widget>
            <Original></Original>
          </Widget>
          {/* <Widget>
            <Viewer></Viewer>
          </Widget> */}
        </EditorWrapper>
      </Wrapper>
    );
  }
}
