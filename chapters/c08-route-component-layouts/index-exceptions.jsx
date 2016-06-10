// some code ...
import MissingRoute from './components/MissingRoute.jsx';

// some code ...
ReactDOM.render(
  <Router history={browserHistory}>
    // some code ...
    <Route path="*" component={HomePage}>
      <IndexRoute component={MissingRoute} />
    </Route>
  </Router>,
  document.getElementById('app')
);
