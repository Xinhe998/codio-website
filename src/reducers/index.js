import { combineReducers } from 'redux';

import userReducer from './userReducer';
import editorReducer from './editorReducer';

const storeFs = combineReducers({
  user: userReducer,
  editor: editorReducer,
});

export default storeFs;
