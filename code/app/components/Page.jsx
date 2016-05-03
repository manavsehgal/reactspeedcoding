import React from 'react';
import CardStack from './CardStack.jsx';
import LeanPub from './LeanPub.jsx';

export default class Page extends React.Component {
  render() {
    return (
      <div className="holygrail">
        <ul className="navigation grid bottom grid-gutters grid-flex-cells">
          <li className="grid-cell top">
            <a className="navigation-link navigation-brand" href="/">ReactSpeed</a>
          </li>
          <li className="grid-cell auto-size">
            <a className="navigation-link"
              href="https://leanpub.com/reactspeedcoding">
                <i className="fa fa-book"></i> Book
            </a>
          </li>
          <li className="grid-cell auto-size">
            <a className="navigation-link"
              href="https://github.com/manavsehgal/reactspeedcoding">
                <i className="fa fa-github"></i> Code
            </a>
          </li>
          <li className="grid-cell auto-size">
            <a className="navigation-link"
              href="https://leanpub.com/reactspeedcoding/feedback">
                <i className="fa fa-comments"></i> Discuss
            </a>
          </li>
        </ul>
        <header className="holygrail-header">
          <div className="header header-cozy" role="banner">
            This app is built using code from the book&nbsp;<a href="https://leanpub.com/reactspeedcoding">React Speed Coding</a>. Concept to coding React apps, speedily!
          </div>
        </header>
        <main className="holygrail-body">
          <article className="holygrail-content">
            <h1>ReactSpeed UI Components</h1>
            <CardStack />
          </article>
          <nav className="holygrail-nav u-textCenter">
            <p>Learn to build a custom UI framework in React, Flexbox, and PostCSS.</p>
            <p>Apply new ES6 features to make your React code more reliable.</p>
            <p>Master component design workflow
            with several strategies for reusable, reliable, and rapid coding in React.</p>
            <p>Connect to a real-time database using Firebase.</p>
            <p>Speed up your React development workflow using Webpack.</p>
            <p>Download and reuse fully tested source code from GitHub. Run demo app and components live
            at ReactSpeed website.</p>
            <h4>Get the book <a href="https://leanpub.com/reactspeedcoding">React Speed Coding</a>.</h4>
          </nav>
          <aside className="holygrail-ads u-textCenter">
            <LeanPub bookid="reactspeedcoding" />
            <h3>
            ReactSpeed equips you with best practices, optimized workflows, and powerful tooling.
            </h3>
          </aside>
        </main>
        <footer className="holygrail-footer">
          <div className="Footer">
            Copyright (c) 2016, Manav Sehgal. Code is MIT license.
          </div>
        </footer>
      </div>
    );
  }
}
