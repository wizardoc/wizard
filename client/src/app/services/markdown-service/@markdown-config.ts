import MarkdownIT from 'markdown-it';
import hljs from 'highlight.js';
// import MDContainer from 'markdown-it-container';

import * as plugins from './@plugins';

export const markdown = MarkdownIT({
  typographer: true,
  highlight(code: string) {
    return hljs.highlightAuto(code).value;
  },
});

for (const name of Object.keys(plugins)) {
  markdown.use(plugins[name]);
}

// markdown.use(MDContainer, '', {
//   validate: (_params: any) => {
//     return true;
//   },
//   render(tokens: any, idx: any) {
//     console.info(tokens[idx]);

//     return '';
//   },
// });
