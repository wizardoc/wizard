import React, {Component, ReactNode} from 'react';

export class Home extends Component {
  handleHelloClick(): void {
    alert('click');
  }

  render(): ReactNode {
    return <div onClick={() => this.handleHelloClick()}>Home</div>;
  }
}
