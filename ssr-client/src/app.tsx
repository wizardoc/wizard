import {createMemoryHistory} from 'history';
import React, {Component, ReactNode} from 'react';
import {Router} from 'react-router-dom';

import {Routes} from './routes';

export class App extends Component {
  handleHelloClick(): void {
    alert('click');
  }

  render(): ReactNode {
    return (
      <Router history={createMemoryHistory()}>
        <Routes></Routes>
      </Router>
    );
  }
}
