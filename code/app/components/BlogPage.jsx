import React from 'react';
import CardStack from './CardStack.jsx';
import LeanPub from './LeanPub.jsx';
import Navigation from './Navigation.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Aside from './Aside.jsx';
import Footer from './Footer.jsx';
import SiteData from '../content/SiteData.js';

import Blog from './Blog.jsx';

export default class BlogPage extends React.Component {
  render() {
    return (
      <div className="holygrail">
        <Navigation />
        <Header promo={SiteData.blog.header} />
        <main className="holygrail-body">
          <article className="holygrail-content">
            <Blog />
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
}
