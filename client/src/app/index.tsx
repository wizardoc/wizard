import 'animate.css/animate.min.css';
import 'highlight.js/styles/atom-one-light.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {App} from './App';
import './assets/iconfont/iconfont.css';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
export * from './App';
export * from './assets';
export * from './components';
export * from './constant';
export * from './routes';
export * from './services';
export * from './store';
export * from './theme';
export * from './ui';
export * from './utils';
export * from './animations';
export * from './api';
export * from './app-routing';
