import {Fab} from '@material-ui/core';
import styled from 'styled-components';

/** styled-components 化的 Circle Fab */
export const StyledFab = styled(Fab)`
  background: ${props => props.theme.secondaryColor};
`;
