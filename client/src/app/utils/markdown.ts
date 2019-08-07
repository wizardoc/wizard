import hljs from 'highlight.js';
import Marked from 'marked';

const renderer = new Marked.Renderer();

renderer.image = (href, _title, text): string =>
  `<div class="md-img-container">
  <img class="md-img" src="${href}" alt="${text}" />
  </div>`;

renderer.heading = (text: string, level: number): string => {
  return `<h${level} id="${text}" class="md-heading">${text}</h${level}>`;
};

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
