import styled from 'styled-components';

export interface CarpetProps {
  color: string;
}

export const Carpet = styled.div<CarpetProps>`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: -2;
  background: ${props => props.color};
`;
