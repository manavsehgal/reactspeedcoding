import store from '../../store/roadmap';
import * as actions from '../../actions/roadmap';
import features from './features';

const roadmapHydrate = () => {
  /*
  // Log the initial state
  console.log(store.getState());

  // Every time the state changes, log it
  // Note that subscribe() returns a function for unregistering the listener
  const unsubscribe = store.subscribe(() =>
    console.log(store.getState())
  );
  */
  for (let i = 0; i < features.length; i++) {
    store.dispatch(actions
      .addFeature(
        features[i].id,
        features[i].title,
        features[i].about,
        features[i].category,
        features[i].likes,
        features[i].link
      ));
  }

  /*
  // Stop listening to state updates
  unsubscribe();
  */
};

export default roadmapHydrate;
