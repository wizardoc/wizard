import {CircularProgress} from '@material-ui/core';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.7);
  color: white;
`;

export class NormalLoading extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <CircularProgress />
        <p>Loading...</p>
      </Wrapper>
    );
  }
}
