import React from 'react';
import CardStack from './CardStack.jsx';

export default class Page extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <ul className="navigation">
          <li className="brand"><a href="#">ReactSpeed</a></li>
          <li><a href="#">Home</a></li>
          <li><a href="#">Book</a></li>
          <li><a href="#">Components</a></li>
          <li><a href="#">Github</a></li>
        </ul>
        <header className="header">Header</header>
        <article className="main">
          <CardStack />
        </article>
        <aside className="aside aside-1">Aside 1</aside>
        <aside className="aside aside-2">Aside 2</aside>
        <footer className="footer">
          Copyright (c) 2016, Manav Sehgal. Code is MIT license.
        </footer>
      </div>
    );
  }
}
