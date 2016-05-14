import React from 'react';
import LeanPub from './LeanPub.jsx';
import Navigation from './Navigation.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Aside from './Aside.jsx';
import Footer from './Footer.jsx';
import SiteData from '../content/SiteData.js';
import Helmet from 'react-helmet';

export default function HomePage(props) {
  return (
    <div className="holygrail">
      <Helmet
        htmlAttributes={{ lang: 'en', amp: undefined }} // amp takes no value
        title="React Speed Coding"
        titleTemplate="%s | ReactSpeed.com"
        defaultTitle="React Speed Coding"
        meta={[
          { name: 'description',
            content: `Learn JavaScript ES6 React with 25+ reusable components,
              PostCSS FlexBox styles, Webpack Babel build, 14 ebook chapters.`
          },
          { property: 'og:type', content: 'website' },
          { property: 'og:image', content: 'https://reactspeed.com/img/roadmap-t.jpg' }
        ]}
        link={[
          { rel: 'canonical', href: 'https://reactspeed.com' }
        ]}
      />
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
