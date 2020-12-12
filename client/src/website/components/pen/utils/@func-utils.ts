import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import DescriptionIcon from '@material-ui/icons/Description';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';

import {Util} from './utils-box';

export const FuncUtils: Util[] = [
  {
    tip: '编辑摘要',
    icon: DescriptionIcon,
  },
  {
    tip: '导入',
    icon: FlightLandIcon,
  },
  {
    tip: '导出',
    icon: FlightTakeoffIcon,
  },
  {
    tip: '保存',
    icon: SaveIcon,
  },
  {
    tip: '撤销',
    icon: UndoIcon,
  },
];
