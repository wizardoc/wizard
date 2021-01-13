import {TextField} from '@material-ui/core';
import {TextFieldProps} from '@material-ui/core/TextField';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

interface IconProps {
  iconSize?: string;
  focusColor?: string;
}

interface FocusIconProps {
  isFocus?: boolean;
}

interface IconInputProps extends IconProps {
  icon: ReactNode;
}

export type WithIconInputProps = TextFieldProps & IconInputProps;

const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: flex-end;
`;

const Icon = styled.div<IconProps & FocusIconProps>`
  margin-right: 10px;

  > svg {
    ${props => props.isFocus && `color: ${props.focusColor || props.theme.primaryColor};`}
    ${props => (props.iconSize ? `font-size:${props.iconSize}` : '')};
  }
`;

@observer
export class WithIconInput extends Component<WithIconInputProps> {
  @observable
  isTextFieldFocus = false;

  toggleIsTextFieldFocus(): void {
    this.isTextFieldFocus = !this.isTextFieldFocus;
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <Icon
          iconSize={this.props.iconSize}
          focusColor={this.props.focusColor}
          isFocus={this.isTextFieldFocus}
        >
          {this.props.icon}
        </Icon>
        <TextField
          {...this.props}
          onFocus={() => this.toggleIsTextFieldFocus()}
          onBlur={() => this.toggleIsTextFieldFocus()}
        />
      </Wrapper>
    );
  }
}
