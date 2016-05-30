import store from '../../store/roadmap';
import * as actions from '../../actions/roadmap';
import features from './features';

const roadmapHydrate = () => {
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
};

export default roadmapHydrate;
