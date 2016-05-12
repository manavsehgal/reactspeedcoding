import React, { PropTypes } from 'react';
import LeanPub from './LeanPub.jsx';
import Navigation from './Navigation.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Aside from './Aside.jsx';
import Footer from './Footer.jsx';
import SiteData from '../content/SiteData.js';
import PostSummary from './PostSummary.jsx';

export default class BlogPage extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  render() {
    const gridClass = 'grid grid-gutters grid-full grid-flex-cells large-grid-fit';
    let renderHeading = 'ReactSpeed Blog';
    return (
      <div className="holygrail">
        <Navigation />
        <Header promo={SiteData.blog.header} />
        <main className="holygrail-body">
          <article className="holygrail-content">
            <div>
              <h1>{renderHeading}</h1>
              <div className={gridClass}>
                <PostSummary />
                {this.props.children}
              </div>
            </div>
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
