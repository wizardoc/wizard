import styled from 'styled-components';
import {Typography} from '@material-ui/core';

import {styledTheme} from 'website/theme';

export const MDText = styled(Typography)`
  display: inline;
  color: ${styledTheme.articleColor};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;
`;
