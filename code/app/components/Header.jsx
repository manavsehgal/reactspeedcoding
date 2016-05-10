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
        <div className="header header-cozy" role="banner">
          {promo
            ? <div>
              {promo.message}&nbsp;
              <a href={promo.promoButton.url} className="button success">
                {promo.promoButton.label}
              </a>
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
