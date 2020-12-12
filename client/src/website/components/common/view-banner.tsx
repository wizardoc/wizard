import React, {Component, ReactNode, ComponentType} from 'react';
import styled from 'styled-components';
import {Button} from '@material-ui/core';
import {ButtonProps} from '@material-ui/core/Button';

interface ActionButton extends ActionButtonProps {
  text: string;
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

interface ActionButtonProps {
  primary?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: ${props => props.height || 200}px;
  padding: 40px;
  background: ${props => props.color || props.theme.primaryColor};
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

const TextWrapper = styled.div`
  font-weight: 300 !important;
`;

const Title = styled.h1`
  font-weight: 300;
  font-size: 30px;
  color: ${props => props.theme.white};
`;

const Description = styled.div`
  font-size: 18px;
  color: ${props => props.theme.white};
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
`;

const ActionButton = styled(Button)<ActionButtonProps>`
  padding: 10px 16px !important;
  font-size: 18px !important;
  line-height: 1.33 !important;
  color: ${props => props.theme.white} !important;
  border-color: ${props => props.theme.white} !important;
  width: fit-content !important;
  font-weight: 300 !important;
  margin-left: 15px !important;

  ${props =>
    props.primary &&
    `
      background: ${props.theme.white} !important;
      color: ${props.theme.primaryColor} !important;
    `}

  ${props =>
    !props.primary &&
    `
    :hover {
      background-color: ${props.theme.translucentWhite} !important;
    }
  `}
` as ComponentType<ButtonProps & ActionButtonProps>;

export class ViewBanner extends Component<ViewBannerProps & WrapperProps> {
  render(): ReactNode {
    const {height, title, description, color, actionButtons = []} = this.props;
    const buttons = actionButtons.map(({text, primary, handler}) => (
      <ActionButton
        primary={primary}
        variant={primary ? 'contained' : 'outlined'}
        onClick={handler}
      >
        {text}
      </ActionButton>
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
