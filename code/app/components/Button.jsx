import React, { PropTypes, Component } from 'react';

class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string.isRequired
  }

  static defaultProps = {
    className: 'button default',
    icon: '',
    label: '',
  }

  render () {
    return (
      <button className={this.props.className} onClick={this.props.onClick}>
        {this.props.label}
      </button>
    );
  }
}

export default Button;
