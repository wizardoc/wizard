import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

export interface ReleaseTagProps {
  tag: 'NEW' | 'PATCH' | 'FEATURE';
}

const Wrapper = styled.div``;

export class ReleaseTag extends Component<ReleaseTagProps> {
  render(): ReactNode {
    return <Wrapper>{this.props.tag}</Wrapper>;
  }
}
