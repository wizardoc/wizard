import {TextField} from '@material-ui/core';
import {TextFieldProps} from '@material-ui/core/TextField';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

interface WithIconInputProps {
  icon: ReactNode;
}

const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
`;

export class WithIconInput extends Component<
  TextFieldProps & WithIconInputProps
> {
  render(): ReactNode {
    return (
      <Wrapper>
        {this.props.icon}
        <TextField {...this.props}></TextField>
      </Wrapper>
    );
  }
}
