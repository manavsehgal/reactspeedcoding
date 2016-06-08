import React from 'react';

export default function Card(props) {
  render() {
    const cardClass = this.props.message
      ? 'card is-message' : 'card';
    const gridClass = this.props.size
      ? `grid-cell u-${this.props.size}`
      : `grid-cell`;

    return (
      <div className={gridClass}>
        <div className={cardClass}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
