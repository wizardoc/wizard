import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import LinkConfig from './link-config.json';
import {LinkColumnProps, LinkColumn} from './link-column';

interface LinkConfig {
  [index: string]: LinkColumnProps;
}

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  background: ${props => props.theme.dark};
  padding: 40px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

export class FooterPanel extends Component {
  renderCols: ReactNode;

  constructor(props: {}) {
    super(props);

    this.renderCols = this.renderLinks(LinkConfig as LinkConfig);
  }

  render(): ReactNode {
    return <Wrapper>{this.renderCols}</Wrapper>;
  }

  private renderLinks(config: LinkConfig): ReactNode {
    return Object.keys(config).map(key => <LinkColumn key={key} {...config[key]} />);
  }
}
