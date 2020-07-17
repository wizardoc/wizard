import React, {Component, ReactNode, createElement} from 'react';
import styled from 'styled-components';

export interface HeaderProps {
  level: string;
}

const Prefix = styled.div`
  color: ${props => props.theme.deepGray};
`;

const Content = styled.div``;

export class Header extends Component<HeaderProps> {
  render(): ReactNode {
    const {level, children} = this.props;
    const [prefix, content] = parseHeader(children as string);

    console.info(prefix?.toString());
    console.info(prefix, content);

    return createElement(
      `h${level}`,
      {},
      <>
        <Prefix>{prefix}</Prefix>
        <Content>{content}</Content>
      </>,
    );
  }
}

function parseHeader(header: string): [string, string] {
  return [header.slice(0, 1), header.slice(2)];
}
