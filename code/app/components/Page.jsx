import React from 'react';
import CardStack from './CardStack.jsx';
import LeanPub from './LeanPub.jsx';

export default class Page extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <ul className="navigation">
          <li><a className="brand" href="/">ReactSpeed</a></li>
          <li><a href="/">Home</a></li>
          <li><a href="https://leanpub.com/reactspeedcoding">Book</a></li>
          <li><a href="https://github.com/manavsehgal/reactspeedcoding">Code</a></li>
          <li><a href="https://leanpub.com/reactspeedcoding/feedback">Discuss</a></li>
        </ul>
        <header className="header">
          This app is built using code from
          the book <a href="https://leanpub.com/reactspeedcoding">React Speed Coding</a>.
          Concept to coding React apps, speedily!
        </header>
        <article className="main">
          <CardStack />
        </article>
        <aside className="aside aside-1">
          <p>Speed up your React development workflow using Webpack.</p>
          <p>Learn to build a custom UI framework in React, Flexbox, and PostCSS. Connect to a
          real-time database using Firebase. Apply new ES6 features to make your React code more reliable.</p>
          <p>Download and reuse fully tested source code from GitHub. Run demo app and components live
          at ReactSpeed website.</p>
          <p>Master component design workflow
          with several strategies for reusable, reliable, and rapid coding in React.</p>
          <h4>Get the book <a href="https://leanpub.com/reactspeedcoding">React Speed Coding</a>.</h4>
        </aside>
        <aside className="aside aside-2">
          <LeanPub bookid="reactspeedcoding" />
          <h3>
          ReactSpeed equips you with best practices, optimized workflows, and powerful tooling.
          </h3>
        </aside>
        <footer className="footer">
          Copyright (c) 2016, Manav Sehgal. Code is MIT license.
        </footer>
      </div>
    );
  }
}
