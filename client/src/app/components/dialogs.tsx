import React, {FunctionComponent} from 'react';

import {Access} from './@access';
import {Loading} from './@loading';

export const Dialogs: FunctionComponent = () => {
  return (
    <>
      <Loading />
      <Access />
    </>
  );
};
