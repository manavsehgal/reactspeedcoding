import React, { PropTypes } from 'react';

class Footer extends React.Component {
  static propTypes = {
    copyright: PropTypes.string,
    children: PropTypes.node
  }
  static defaultProps = {
    copyright: ''
  }
  render() {
    return (
      <footer className="holygrail-footer">
        <div className="Footer">
          {this.props.copyright ? <p>{this.props.copyright}</p> : ''}
          {this.props.children}
        </div>
      </footer>
    );
  }
}

export default Footer;
