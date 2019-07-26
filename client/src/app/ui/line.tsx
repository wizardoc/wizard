import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

interface InnerLineProps {
  lineColor?: string;
}

interface LineProps extends InnerLineProps {}

const InnerLine = styled.div<InnerLineProps>`
  width: 85%;
  height: 1px;
  background: ${props => props.lineColor};
`;

const LineWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Line: FunctionComponent<LineProps> = ({lineColor = '#7f8c8d'}) => (
  <LineWrapper>
    <InnerLine lineColor={lineColor}></InnerLine>
  </LineWrapper>
);
