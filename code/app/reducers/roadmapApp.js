import * as reducers from './roadmap';
import { combineReducers } from 'redux';

const roadmapApp = combineReducers(reducers);
export default roadmapApp;
