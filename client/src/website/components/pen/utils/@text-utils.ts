import FormatBoldIcon from '@material-ui/icons/FormatBold';
import TitleIcon from '@material-ui/icons/Title';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import DeleteIcon from '@material-ui/icons/Delete';

import {Util} from './utils-box';

export const TextUtils: Util[] = [
  {
    tip: '加粗',
    style: 'bold',
    icon: FormatBoldIcon,
  },
  {
    tip: '标题',
    style: 'header-one',
    icon: TitleIcon,
  },
  {
    tip: '斜体',
    style: 'italic',
    icon: FormatItalicIcon,
  },
  {
    tip: '删除线',
    style: 'delete',
    icon: DeleteIcon,
  },
];
