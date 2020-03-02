import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Link as MaterialLink} from '@material-ui/core';

export interface LinkColumnProps {
  title: string;
  links: Link[];
}

interface Link {
  text: string;
  href: string;
}

const Wrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.theme.darkWhite};
`;

const LinkContainer = styled.div`
  margin-top: 20px;
`;

const LinkItem = styled.div`
  font-size: 14px;
  font-weight: 300;
  margin: 5px 0;

  > a {
    color: ${props => props.theme.darkGray};
    cursor: pointer;
  }
`;

@withRouter
export class LinkColumn extends Component<
  LinkColumnProps & Partial<RouteComponentProps>
> {
  render(): ReactNode {
    const {title, links} = this.props;
    const renderLinks = links.map(link => (
      <LinkItem>
        <MaterialLink href={link.href}>{link.text}</MaterialLink>
      </LinkItem>
    ));

    return (
      <Wrapper>
        <Title>{title}</Title>
        <LinkContainer>{renderLinks}</LinkContainer>
      </Wrapper>
    );
  }
}
