import React, {FunctionComponent} from 'react';

import {Loading} from './@loading';
import {Login} from './@login';
import {Register} from './@register';

export const Dialogs: FunctionComponent = () => {
  return (
    <>
      <Loading />
      <Register />
      <Login />
    </>
  );
};
