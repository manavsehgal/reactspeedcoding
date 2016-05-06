import React, { PropTypes } from 'react';

class Aside extends React.Component {
  render () {
    return (
      <aside className="holygrail-ads u-textCenter">
        {this.props.children}
      </aside>
    );
  }
}

export default Aside;
