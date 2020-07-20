import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Inject} from '@wizardoc/injector';
import {Document} from '@wizardoc/shared';
import {RouteComponentProps} from 'react-router-dom';

import {MarkdownService, RenderAssets} from 'src/app/services';
import {Catalog} from 'src/app/ui';

import {FetchDataComponentProps, FetchData} from '../loading';

import {AuthorCard} from './@author-card';
import {FunctionPanel} from './@function-pannel';

export interface MarkdownContentProps extends Document {}

interface RouteParams {
  id: string;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background: ${props => props.theme.white};
`;

export const Container = styled.div`
  width: 690px;
  padding: 10px 50px;
`;

const Title = styled.div`
  font-weight: 600;
  font-synthesis: style;
  font-size: 27px;
  line-height: 1.22;
  margin: 24px 0;
  word-wrap: break-word;
`;

const Content = styled.div``;

const StyledCatalog = styled(Catalog)`
  position: sticky;
  top: 70px;
  margin-top: 40px;
`;

// @FetchData(
//   async (
//     {extract},
//     props: MarkdownContentProps & RouteComponentProps<RouteParams>,
//   ) => extract(MarkdownService).render(props.path, props.match.params.id),
// )
export class MarkdownContent extends Component<
  MarkdownContentProps & Partial<FetchDataComponentProps<RenderAssets>>
> {
  @Inject
  markdownService!: MarkdownService;

  render(): ReactNode {
    const {
      title,
      author,
      organizationInfo,
      data,
      headings,
      content,
    } = this.props;
    // const {content, headings} = data!;

    return (
      <Wrapper>
        <StyledCatalog headings={headings} title="目录" />
        <Container>
          <Title>{title}</Title>
          <AuthorCard author={author} />
          <Content dangerouslySetInnerHTML={{__html: content}} />
        </Container>
        <FunctionPanel organizationInfo={organizationInfo} />
      </Wrapper>
    );
  }

  componentDidMount(): void {
    this.markdownService.registerAnchor(this.props.headings);
  }
}
