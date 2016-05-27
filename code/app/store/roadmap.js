import { createStore } from 'redux';
import roadmapApp from '../reducers/roadmapApp';
const store = createStore(roadmapApp);
export default store;
