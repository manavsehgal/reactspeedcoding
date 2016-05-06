import React from 'react';
import CardStack from './CardStack.jsx';
import LeanPub from './LeanPub.jsx';
import Navigation from './Navigation.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Aside from './Aside.jsx';
import Footer from './Footer.jsx';
import SiteData from '../content/SiteData.js';

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="holygrail">
        <Navigation />
        <Header>
          The book&nbsp;<a href="https://leanpub.com/reactspeedcoding">React Speed Coding</a>&nbsp;documents
          how this site and ReactSpeed UI components are developed.
        </Header>
        <main className="holygrail-body">
          <article className="holygrail-content">
            <CardStack />
          </article>
          <Sidebar>
            <p>Learn to build your own custom UI library in React, Flexbox, and PostCSS.</p>
            <p>Apply new ES6 features to make your React code more reliable.</p>
            <p>Master component design workflow
            with several strategies for reusable, reliable, and rapid coding in React.</p>
            <p>Connect to a real-time database using Firebase.</p>
            <p>Speed up your React development workflow using Webpack.</p>
            <p>Download and reuse fully tested source code from GitHub. Run demo app and components live
            at ReactSpeed website.</p>
            <h4>Get the book <a href="https://leanpub.com/reactspeedcoding">React Speed Coding</a>.</h4>
          </Sidebar>
          <Aside>
            <LeanPub bookid="reactspeedcoding" />
            <h3>
            {SiteData.tagline}
            </h3>
          </Aside>
        </main>
        <Footer>
          {SiteData.copyright}
        </Footer>
      </div>
    );
  }
}
