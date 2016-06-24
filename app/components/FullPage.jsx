import React from 'react';
import Navigation from './Navigation.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SiteData from '../content/SiteData.js';

export default function FullPage(props) {
  return (
    <div className="holygrail">
      <Navigation />
      <Header promo={SiteData.home.header} />
      <main className="holygrail-body">
        <article className="holygrail-content">
          {props.children}
        </article>
      </main>
      <Footer copyright={SiteData.copyright} />
    </div>
  );
}
FullPage.propTypes = {
  children: React.PropTypes.node
};
