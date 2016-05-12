import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage.jsx';
import PostSummary from './components/PostSummary.jsx';
import PostDetail from './components/PostDetail.jsx';
import CardStack from './components/CardStack.jsx';
import MissingRoute from './components/MissingRoute.jsx';

import { Route, Router, IndexRoute, browserHistory } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={HomePage}>
      <IndexRoute component={CardStack} />
      <Route path="/blog" component={PostSummary} />
      <Route path="/blog/:slug" component={PostDetail} />
    </Route>
    <Route path="*" component={HomePage}>
      <IndexRoute component={MissingRoute} />
    </Route>
  </Router>,
  document.getElementById('app')
);
