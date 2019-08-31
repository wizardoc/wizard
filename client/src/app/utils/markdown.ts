import hljs from 'highlight.js';
import Marked from 'marked';

const renderer = new Marked.Renderer();

renderer.image = (href, _title, text): string =>
  `<div class="md-img-container">
  <img class="md-img" src="${href}" alt="${text}" />
  </div>`;

renderer.heading = (_text: string, level: number, raw: string): string =>
  `<h${level} class="md-heading" id=${raw}>${raw}</h${level}>`;
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
