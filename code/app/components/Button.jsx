import React, { PropTypes, Component } from 'react';

class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
  }

  render () {
    return (
      // [TODO] How do bring other event types in here using spread operators
      <button className={this.props.className} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
