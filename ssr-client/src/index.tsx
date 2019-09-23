import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './app';

ReactDOM.hydrate(<App />, document.getElementById('root'));

export * from './app';
export * from './routes';
