import React from 'react';
import CardStack from './CardStack.jsx';

export default class Page extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <ul className="navigation">
          <li><a className="brand" href="/">ReactSpeed</a></li>
          <li><a href="/">Home</a></li>
          <li><a href="https://leanpub.com/reactspeedcoding">Book</a></li>
          <li><a href="https://github.com/manavsehgal/reactspeedcoding">Github</a></li>
        </ul>
        <header className="header">Concept to coding React apps, speedily!</header>
        <article className="main">
          <CardStack />
        </article>
        <aside className="aside aside-1">
          <h3>This app is built using code from the book <a href="https://leanpub.com/reactspeedcoding">React Speed Coding</a>.</h3>
        </aside>
        <aside className="aside aside-2">
          <h3>
          ReactSpeed equips you, for your React project requirements,
          with best practices, optimized workflows, and powerful tooling.
          </h3>
        </aside>
        <footer className="footer">
          Copyright (c) 2016, Manav Sehgal. Code is MIT license.
        </footer>
      </div>
    );
  }
}
