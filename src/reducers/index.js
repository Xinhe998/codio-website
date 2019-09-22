import { combineReducers } from 'redux';

import userReducer from './userReducer';
import editorReducer from './editorReducer';
import projectReducer from './projectReducer';

const storeFs = combineReducers({
  user: userReducer,
  editor: editorReducer,
  project: projectReducer,
});

export default storeFs;
