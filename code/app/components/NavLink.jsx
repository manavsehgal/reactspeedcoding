import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class NavLinks extends React.Component {
  static propTypes = { brand: PropTypes.bool, to: PropTypes.string }
  static defaultProps = { brand: false }

  render() {
    const renderClass = this.props.brand
      ? 'navigation-link navigation-brand'
      : 'navigation-link';

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
          : <a {...this.props} className="navigation-link" />
        }
      </li>
    );
  }
}
