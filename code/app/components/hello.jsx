import React, {Component} from 'react';

export default class Hello extends Component {
  render() {
    return <div className="hello-message">Hello {this.props.message}</div>;
  }
}
