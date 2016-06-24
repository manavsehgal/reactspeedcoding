import React, { PropTypes } from 'react';

class Header extends React.Component {
  static propTypes = {
    promo: PropTypes.object,
    children: PropTypes.node
  }
  static defaultProps = {
    promo: {}
  }
  render() {
    const promo = this.props.promo;
    return (
      <header className="holygrail-header">
        <div className="header" role="banner">
          {promo
            ? <div>
              <div className="header-title">
                {promo.message}
              </div>
            </div>
            : ''
          }
          {this.props.children}
        </div>
      </header>
    );
  }
}

export default Header;
