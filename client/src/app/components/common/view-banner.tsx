import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Button} from '@material-ui/core';

interface ActionButton {
  text: string;
  primary?: string;
  handler(): void;
}

export interface ViewBannerProps {
  title: string;
  description?: string;
  background?: string;
  actionButtons?: ActionButton[];
}

interface WrapperProps {
  height?: number;
  color?: string;
}

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: ${props => props.height || 100}px;
  background: ${props => props.color || props.theme.primaryColor};
`;

const TextWrapper = styled.div``;

const Title = styled.div``;

const Description = styled.div``;

const ActionButtons = styled.div``;

export class ViewBanner extends Component<ViewBannerProps & WrapperProps> {
  render(): ReactNode {
    const {height, title, description, color, actionButtons = []} = this.props;
    const buttons = actionButtons.map(({text, primary, handler}) => (
      <Button variant={primary ? 'contained' : 'outlined'} onClick={handler}>
        {text}
      </Button>
    ));

    return (
      <Wrapper height={height} color={color}>
        <TextWrapper>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextWrapper>
        <ActionButtons>{buttons}</ActionButtons>
      </Wrapper>
    );
  }
}
