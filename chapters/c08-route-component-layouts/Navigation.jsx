import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class Navigation extends React.Component {
  render () {
    return (
      <ul
        className={`navigation grid grid-gutters
          large-grid-fit med-grid-fit small-grid-1of2`}
      >
        <li className="grid-cell">
          <Link
            className="navigation-link navigation-brand"
            to="/"
          >
            ReactSpeed
          </Link>
        </li>
        <li className="grid-cell">
          <a
            className="navigation-link"
            href="https://leanpub.com/reactspeedcoding"
          >
              <i className="fa fa-book"></i> Book
          </a>
        </li>

        <li className="grid-cell">
          <a
            className="navigation-link"
            href="https://github.com/manavsehgal/reactspeedcoding"
          >
              <i className="fa fa-github"></i> Code
          </a>
        </li>
        <li className="grid-cell">
          <Link
            className="navigation-link"
            activeClassName="navigation-link active"
            to="/blog"
          >
            <i className="fa fa-comments"></i> Blog
          </Link>
        </li>
      </ul>
    );
  }
}

export default Navigation;
