import { combineReducers } from 'redux';

import userReducer from './userReducer';
import editorReducer from './editorReducer';
import projectReducer from './projectReducer';
import tagsReducer from './tagsReducer';
import portfolioReducer from './portfolioReducer';
import resumeReducer from './resumeReducer';
import settingsReducer from './settingsReducer';

const storeFs = combineReducers({
  user: userReducer,
  editor: editorReducer,
  project: projectReducer,
  tags: tagsReducer,
  portfolio: portfolioReducer,
  resume: resumeReducer,
  settings: settingsReducer,
});

export default storeFs;
