import React from 'react';
import ReactDOM from 'react-dom';
import BlogPage from './components/BlogPage.jsx';
import HomePage from './components/HomePage.jsx';

import { Router, Route, browserHistory } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={HomePage}/>
    <Route path="/blog" component={BlogPage}/>
  </Router>,
  document.getElementById('app')
);
