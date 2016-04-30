import React, {PropTypes} from 'react';

export default class Card extends React.Component {
  static propTypes = { size: PropTypes.string, message: PropTypes.bool }
  static defaultProps = { size: '', message: false }
  render() {
    const cardClass = this.props.message ? 'card is-message': 'card';
    const gridClass = this.props.size
      ? `grid-cell u-${this.props.size}`: `grid-cell`;

    return (
      <div className={gridClass}>
        <div className={cardClass}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
