import React from 'react';
import Navigation from './Navigation.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import SiteData from '../content/SiteData.js';

export default function HomePage(props) {
  return (
    <div className="holygrail">
      <Navigation />
      <Header promo={SiteData.home.header} />
      <main className="holygrail-body">
        <article className="holygrail-content">
          {props.children}
        </article>
        <Sidebar data={SiteData.home.sidebar}>
          <a
            className="image-link"
            href="//geo.itunes.apple.com/us/book/react-speed-coding/id1123718637?mt=11"
          >
            <img
              src="//linkmaker.itunes.apple.com/images/badges/en-us/badge_ibooks-lrg.svg"
              alt="React Speed iBook"
              width="112px"
              height="40px"
            />
          </a>
          <p className="call-to-action-ibooks">ReactSpeed Book</p>
        </Sidebar>
      </main>
      <Footer copyright={SiteData.copyright} />
    </div>
  );
}
HomePage.propTypes = {
  children: React.PropTypes.node
};
