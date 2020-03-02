import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

export interface ReleaseTagProps {
  tag: 'NEW' | 'PATCH' | 'FEATURE';
}

const Wrapper = styled.div`
  background: ${props => props.theme.primaryColor};
  padding: 3px;
  border-radius: 5px;
  color: ${props => props.theme.white};
  margin: 1px;
`;

export class ReleaseTag extends Component<ReleaseTagProps> {
  render(): ReactNode {
    return <Wrapper>{this.props.tag}</Wrapper>;
  }
}
