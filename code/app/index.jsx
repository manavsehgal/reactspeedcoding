import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage.jsx';
import PostSummary from './components/PostSummary.jsx';
import PostDetail from './components/PostDetail.jsx';
import CardStack from './components/CardStack.jsx';
import CardStackAjax from './components/CardStackAjax.jsx';
import CardStackInfo from './components/CardStackInfo.jsx';
import CardStackMedia from './components/CardStackMedia.jsx';
import CardStackButton from './components/CardStackButton.jsx';
import CardStackForm from './components/CardStackForm.jsx';
import MissingRoute from './components/MissingRoute.jsx';
import Roadmap from './components/Roadmap.jsx';

import { Route, Router, IndexRoute, browserHistory } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={HomePage}>
      <IndexRoute component={CardStack} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/ajax" component={CardStackAjax} />
      <Route path="/infographics" component={CardStackInfo} />
      <Route path="/media" component={CardStackMedia} />
      <Route path="/forms" component={CardStackForm} />
      <Route path="/buttons" component={CardStackButton} />
      <Route path="/blog" component={PostSummary} />
      <Route path="/blog/:slug" component={PostDetail} />
    </Route>
    <Route path="*" component={HomePage}>
      <IndexRoute component={MissingRoute} />
    </Route>
  </Router>,
  document.getElementById('app')
);
