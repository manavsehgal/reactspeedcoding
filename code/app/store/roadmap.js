import { createStore } from 'redux';
import roadmapApp from '../reducers/roadmap';
const store = createStore(roadmapApp);
export default store;
