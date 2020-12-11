import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Snackbar as MaterialSnackBar} from '@material-ui/core';
import {observer} from 'mobx-react';
import {Inject} from '@wizardoc/injector';
import {Alert} from '@material-ui/lab';

import {TipService, Time} from 'website/services';

interface MaterialSnackBarProps {
  index: number;
}

const Wrapper = styled.div``;

const StyledMaterialSnackBar = styled(MaterialSnackBar)<MaterialSnackBarProps>`
  margin-bottom: ${props => props.index * 50}px;
`;

@observer
export class SnackBarQueue extends Component {
  @Inject
  tipService!: TipService;

  handleSnackBarClose(id: string): void {
    this.tipService.removeSnackBar(id);
  }

  render(): ReactNode {
    const renderSnackBars = this.tipService.snackBars.map(
      ({message, variant, id}, index) => {
        const closeHandler = (): void => this.handleSnackBarClose(id);

        return (
          <StyledMaterialSnackBar
            index={index}
            key={id}
            open={true}
            onClose={closeHandler}
            autoHideDuration={Time.Second * 1.8}
          >
            <Alert onClose={closeHandler} severity={variant}>
              {message}
            </Alert>
          </StyledMaterialSnackBar>
        );
      },
    );

    return <Wrapper>{renderSnackBars}</Wrapper>;
  }
}
