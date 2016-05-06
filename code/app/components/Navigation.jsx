import React, { PropTypes } from 'react';

class Navigation extends React.Component {
  render () {
    return (
      <ul className="navigation grid grid-gutters large-grid-fit med-grid-fit small-grid-1of2">
        <li className="grid-cell">
          <a className="navigation-link navigation-brand" href="/">ReactSpeed</a>
        </li>
        <li className="grid-cell">
          <a className="navigation-link"
            href="https://leanpub.com/reactspeedcoding">
              <i className="fa fa-book"></i> Book
          </a>
        </li>
        <li className="grid-cell">
          <a className="navigation-link"
            href="https://github.com/manavsehgal/reactspeedcoding">
              <i className="fa fa-github"></i> Code
          </a>
        </li>
        <li className="grid-cell">
          <a className="navigation-link"
            href="https://github.com/manavsehgal/reactspeedcoding">
              <i className="fa fa-comments"></i> Blog
          </a>
        </li>
      </ul>
    );
  }
}

export default Navigation;
