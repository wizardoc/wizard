import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import CodeIcon from '@material-ui/icons/Code';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import LinkIcon from '@material-ui/icons/Link';
import ImageIcon from '@material-ui/icons/Image';

import {Util} from './utils-box';

export const MarkdownUtils: Util[] = [
  {
    tip: '引用',
    style: 'blockquote',
    icon: FormatQuoteIcon,
  },
  {
    tip: '代码块',
    style: 'code-block',
    icon: CodeIcon,
  },
  {
    tip: '表格',
    style: 'table',
    icon: BorderAllIcon,
  },
  {
    tip: '链接',
    style: 'link',
    icon: LinkIcon,
  },
  {
    tip: '图片',
    style: 'image',
    icon: ImageIcon,
  },
];
