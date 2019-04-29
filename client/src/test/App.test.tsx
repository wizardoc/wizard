import * as React from 'react';
import * as ReactDOM from 'react-dom';

// tslint:disable-next-line:import-path-shallowest
import { App } from '../app/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
