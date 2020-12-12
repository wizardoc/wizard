import React, {FunctionComponent} from 'react';

export const SvgGenerator = (component: JSX.Element): FunctionComponent => {
  return () => <>{component}</>;
};
