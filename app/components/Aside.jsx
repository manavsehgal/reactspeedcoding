import React, { PropTypes } from 'react';

class Aside extends React.Component {
  static propTypes = {
    tagline: PropTypes.string,
    children: React.PropTypes.node
  }
  static defaultProps = {
    tagline: ''
  }
  render() {
    return (
      <aside className="holygrail-ads u-textCenter">
        {this.props.children}
        {this.props.tagline ? <h3>{this.props.tagline}</h3> : ''}
      </aside>
    );
  }
}

export default Aside;
