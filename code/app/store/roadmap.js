import { createStore } from 'redux';
import roadmapApp from '../reducers/roadmapApp';
const store = createStore(roadmapApp, window.devToolsExtension && window.devToolsExtension());
export default store;
