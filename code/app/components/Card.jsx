import React, {PropTypes} from 'react';

export default class Card extends React.Component {
  static propTypes = { size: PropTypes.string, message: PropTypes.bool }
  static defaultProps = { size: '', message: false }
  render() {
    const messageClass = this.props.message ? ' message': '';

    const cardClass = this.props.size
      ? `card-${this.props.size}${messageClass}`
      : `card${messageClass}`;

    return (
      <li className={cardClass}>
        {this.props.children}
      </li>
    );
  }
}
