import React, { PropTypes } from 'react'

class Footer extends React.Component {
  render () {
    return (
      <footer className="holygrail-footer">
        <div className="Footer">
          {this.props.children}
        </div>
      </footer>
    );
  }
}

export default Footer;
