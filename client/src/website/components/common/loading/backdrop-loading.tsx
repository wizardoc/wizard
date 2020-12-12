import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Backdrop, CircularProgress} from '@material-ui/core';
import {observer} from 'mobx-react';
import {Inject} from '@wizardoc/injector';

import {BackdropService} from 'website/services';

const StyledBackdrop = styled(Backdrop)`
  z-index: 3000 !important;
`;

const StyledCircularProgress = styled(CircularProgress)`
  color: ${props => props.theme.white} !important;
`;

@observer
export class BackdropLoading extends Component {
  @Inject
  backdropService!: BackdropService;

  render(): ReactNode {
    const {isViewBackdrop} = this.backdropService;

    return (
      <StyledBackdrop open={isViewBackdrop}>
        <StyledCircularProgress />
      </StyledBackdrop>
    );
  }
}
