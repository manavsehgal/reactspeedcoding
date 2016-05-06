import React, { PropTypes } from 'react'

class Footer extends React.Component {
  render () {
    return (
      <footer className="holygrail-footer">
        {this.props.children}
      </footer>
    );
  }
}

export default Footer;
