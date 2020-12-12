import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import WatchIcon from '@material-ui/icons/Watch';

import {Util} from './utils-box';

export const ListUtils: Util[] = [
  {
    tip: '无序列表',
    style: 'bulleted-list',
    icon: FormatListBulletedIcon,
  },
  {
    tip: '有序列表',
    style: 'numbered-list',
    icon: FormatListNumberedIcon,
  },
  {
    tip: '待办事项',
    style: 'todo-list',
    icon: WatchIcon,
  },
];
