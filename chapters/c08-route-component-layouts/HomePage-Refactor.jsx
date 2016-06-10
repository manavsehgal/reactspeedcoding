import React from 'react';
import LeanPub from './LeanPub.jsx';
import Navigation from './Navigation.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Aside from './Aside.jsx';
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
        <Sidebar data={SiteData.home.sidebar} />
        <Aside tagline={SiteData.tagline}>
          <LeanPub bookid="reactspeedcoding" />
        </Aside>
      </main>
      <Footer copyright={SiteData.copyright} />
    </div>
  );
}
HomePage.propTypes = {
  children: React.PropTypes.node
};
