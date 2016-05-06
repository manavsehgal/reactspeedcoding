import React, { PropTypes } from 'react';

class Sidebar extends React.Component {
  render () {
    return(
      <nav className="holygrail-nav u-textCenter">
        {this.props.children}
      </nav>
    );
  }
}

export default Sidebar;
