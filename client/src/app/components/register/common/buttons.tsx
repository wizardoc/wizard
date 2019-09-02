import Button, {ButtonProps} from '@material-ui/core/Button';
import {ComponentType} from 'react';
import styled from 'styled-components';

export const NextStep = styled(Button)`
  width: 200px;
  margin: 20px 0 !important;
  background: ${props => props.theme.primaryColor} !important;
  color: ${props => props.theme.white} !important;
` as ComponentType<ButtonProps>;
