import MarkdownIt from 'markdown-it';
import React, {ReactElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

import {Heading, MDText, MDLink, MDBlockQuote} from '../../../components';
import {Headings} from '../markdown-service';

export function textProcessor(markdown: MarkdownIt): void {
  let headingMarkup: string | undefined;
  let hasLink = false;
  let isBlockQuoteArea = false;
  let blockQuoteContent: ReactElement[] = [];

  markdown.renderer.rules.heading_open = (token, idx) =>
    noopToken(() => (headingMarkup = token[idx].markup));

  markdown.renderer.rules.link_open = (token, idx) =>
    noopToken(() => (hasLink = !!token[idx].tag));

  markdown.renderer.rules.blockquote_open = () =>
    noopToken(() => (isBlockQuoteArea = true));

  markdown.renderer.rules.blockquote_close = () => {
    isBlockQuoteArea = false;

    console.info(blockQuoteContent.length);

    if (!blockQuoteContent.length) {
      return '';
    }

    const result = renderToStaticMarkup(
      <MDBlockQuote>{blockQuoteContent}</MDBlockQuote>,
    );

    blockQuoteContent = [];

    return result;
  };

  markdown.renderer.rules.text = (token, idx, _options, env: Headings) => {
    const {content} = token[idx];

    if (headingMarkup) {
      const headingLevel = headingMarkup.length;

      // reset headingMarkup
      headingMarkup = undefined;

      env.push({level: +headingLevel, content});

      return renderToStaticMarkup(
        <Heading level={headingLevel}>{content}</Heading>,
      );
    }

    const parseInlineElement = (): ReactElement => {
      if (hasLink) {
        hasLink = false;

        console.info(content, isBlockQuoteArea);

        return <MDLink href="ss">{content}</MDLink>;
      }

      return <MDText variant="body2">{content}</MDText>;
    };

    const inlineElement = parseInlineElement();

    if (isBlockQuoteArea) {
      return noopToken(() => blockQuoteContent.push(inlineElement));
    }

    return renderToStaticMarkup(inlineElement);
  };
}

function noopToken(cb: () => void): string {
  cb();
  return '';
}
