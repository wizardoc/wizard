import hljs from 'highlight.js';
import Marked from 'marked';

const renderer = new Marked.Renderer();

renderer.image = (href, _title, text): string =>
  `<div class="md-img-container">
  <img class="md-img" src="${href}" alt="${text}" />
  </div>`;

renderer.heading = (text: string, level: number): string => {
  const rawText = text.replace(/<span class="md-text">(.+?)<\/span>/, '$1');

  return `<h${level} class="md-heading">${rawText}</h${level}>`;
};

renderer.text = (text: string) => `<span class="md-text">${text}</span>`;

renderer.codespan = (codespan: string) =>
  `<span class="md-codespan">${codespan}</span>`;

export const markdown = Marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: code => {
    return hljs.highlightAuto(code).value;
  },
});
