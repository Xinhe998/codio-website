import * as userActions from './user';
import * as editorActions from './editor';
import * as projectActions from './project';

export default { ...userActions, ...editorActions, ...projectActions };
