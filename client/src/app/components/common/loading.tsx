import {CircularProgress} from '@material-ui/core';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

export class Loading extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <CircularProgress></CircularProgress>
        <p>Loading...</p>
      </Wrapper>
    );
  }
}
