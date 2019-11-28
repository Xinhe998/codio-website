import { combineReducers } from 'redux';

import userReducer from './userReducer';
import editorReducer from './editorReducer';
import projectReducer from './projectReducer';
import tagsReducer from './tagsReducer';
import portfolioReducer from './portfolioReducer';

const storeFs = combineReducers({
  user: userReducer,
  editor: editorReducer,
  project: projectReducer,
  tags: tagsReducer,
  portfolio: portfolioReducer,
});

export default storeFs;
