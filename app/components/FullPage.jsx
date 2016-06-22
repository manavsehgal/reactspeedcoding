import React from 'react';
import Navigation from './Navigation.jsx';
import Footer from './Footer.jsx';
import SiteData from '../content/SiteData.js';

export default function FullPage(props) {
  return (
    <div className="holygrail">
      <Navigation />
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
