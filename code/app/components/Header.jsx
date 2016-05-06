import React, { PropTypes } from 'react';

class Header extends React.Component {
  render () {
    return (
      <header className="holygrail-header">
        <div className="header header-cozy" role="banner">
          {this.props.children}
        </div>
      </header>
    );
  }
}

export default Header;
