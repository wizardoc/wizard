import React from 'react';
import MarkdownIt from 'markdown-it';
import {renderToStaticMarkup} from 'react-dom/server';

import {MDImage, MDInlineCode} from 'website/components';

export function inlineProcessor(markdown: MarkdownIt): void {
  markdown.renderer.rules.image = (tokens, idx) =>
    renderToStaticMarkup(<MDImage src={tokens[idx].attrGet('src') ?? ''} />);

  markdown.renderer.rules.code_inline = (tokens, idx) => {
    console.info(tokens[idx]);

    return renderToStaticMarkup(
      <MDInlineCode>{tokens[idx].content}</MDInlineCode>,
    );
  };
}
