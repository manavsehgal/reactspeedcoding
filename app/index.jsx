import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage.jsx';
import FullPage from './components/FullPage.jsx';
import FullPageHome from './components/FullPageHome.jsx';
import FullPageComponents from './components/FullPageComponents.jsx';
import PostSummary from './components/PostSummary.jsx';
import PostDetail from './components/PostDetail.jsx';
import CardStack from './components/CardStack.jsx';
import CardStackAjax from './components/CardStackAjax.jsx';
import CardStackInfo from './components/CardStackInfo.jsx';
import CardStackMedia from './components/CardStackMedia.jsx';
import CardStackButton from './components/CardStackButton.jsx';
import CardStackForm from './components/CardStackForm.jsx';
import CardStackCustom from './components/CardStackCustom.jsx';
import CardStackCharts from './components/CardStackCharts.jsx';
import WorkflowEditor from './components/WorkflowEditor.jsx';
import MissingRoute from './components/MissingRoute.jsx';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

import Roadmap from './components/Roadmap';
import { Provider } from 'react-redux';
import store from './store/roadmap';
import roadmapHydrate from './fixtures/roadmap/roadmapHydrate';
import SiteData from './content/SiteData.js';
import { firebaseApp, rsdb } from './fixtures/rsdb.js';

roadmapHydrate();

const stackedRoutes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={HomePage}>
        <IndexRoute component={CardStack} />
        <Route path="/roadmap" component={Roadmap} />
        <Route path="/ajax" component={CardStackAjax} />
        <Route path="/infographics" component={CardStackInfo} />
        <Route path="/media" component={CardStackMedia} />
        <Route path="/forms" component={CardStackForm} />
        <Route path="/buttons" component={CardStackButton} />
        <Route path="/custom" component={CardStackCustom} />
        <Route path="/charts" component={CardStackCharts} />
        <Route path="/components" component={FullPageComponents} />
        <Route path="/news" component={PostSummary} />
        <Route path="/blog" component={PostSummary} />
        <Route path="/blog/:slug" component={PostDetail} />
      </Route>
      <Route path="*" component={HomePage}>
        <IndexRoute component={MissingRoute} />
      </Route>
    </Router>
  </Provider>
);

const fullpageRoutes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={FullPage}>
        <IndexRoute component={FullPageHome} />
        <Route path="/roadmap" component={Roadmap} />
        <Route path="/ajax" component={CardStackAjax} />
        <Route path="/infographics" component={CardStackInfo} />
        <Route path="/media" component={CardStackMedia} />
        <Route path="/forms" component={CardStackForm} />
        <Route path="/buttons" component={CardStackButton} />
        <Route
          path="/custom"
          firebaseApp={firebaseApp}
          rsdb={rsdb}
          component={CardStackCustom}
        />
        <Route
          path="/workflow-editor"
          firebaseApp={firebaseApp}
          rsdb={rsdb}
          component={WorkflowEditor}
        />
        <Route path="/components" component={FullPageComponents} />
        <Route path="/charts" component={CardStackCharts} />
        <Route path="/news" component={PostSummary} />
        <Route path="/blog" component={PostSummary} />
        <Route path="/blog/:slug" component={PostDetail} />
      </Route>
      <Route path="*" component={FullPage}>
        <IndexRoute component={MissingRoute} />
      </Route>
    </Router>
  </Provider>
);

let activeRoutes = null;
switch (SiteData.layout) {
case 'holygrail': activeRoutes = stackedRoutes; break;
case 'fullpage': activeRoutes = fullpageRoutes; break;
default: activeRoutes = stackedRoutes;
}

ReactDOM.render(
  activeRoutes,
  document.getElementById('app')
);
