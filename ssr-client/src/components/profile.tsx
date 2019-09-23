import React, {Component, ReactNode} from 'react';

export class Profile extends Component {
  handleHelloClick(): void {
    alert('click');
  }

  render(): ReactNode {
    return <div onClick={() => this.handleHelloClick()}>Profile</div>;
  }
}
