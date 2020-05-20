import React, {Component, ReactNode} from 'react';
import {CircularProgress} from '@material-ui/core';

import styled from 'src/app/theme/style';

export interface InlineLoadingProps {
  isLoading?: boolean;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background: rgba(0, 0, 0, 0.7);
`;

export class InlineLoading extends Component<InlineLoadingProps> {
  render(): ReactNode {
    const {children, isLoading = true} = this.props;

    return (
      <>
        {children}
        {isLoading && (
          <Wrapper>
            <CircularProgress />
          </Wrapper>
        )}
      </>
    );
  }
}
