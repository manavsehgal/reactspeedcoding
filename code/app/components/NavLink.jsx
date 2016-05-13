import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class NavLinks extends React.Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    brand: PropTypes.bool,
    to: PropTypes.string
  }
  static defaultProps = { className: '', brand: false }

  render() {
    const renderClass = this.props.brand
      ? `${this.props.className} navigation-brand`
      : this.props.className;

    const renderActiveClass = this.props.brand
      ? '' : `${renderClass} + active`;

    return (
      <li className="grid-cell">
        {
          this.props.to
          ? <Link
            {...this.props}
            className={renderClass}
            activeClassName={renderActiveClass}
          />
          : <a {...this.props} className={this.props.className} />
        }
      </li>
    );
  }
}
