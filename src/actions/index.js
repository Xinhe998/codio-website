import * as userActions from './user';
import * as editorActions from './editor';
import * as projectActions from './project';
import * as tagsActions from './tags';
import * as portfolioActions from './portfolio';

export default {
  ...userActions,
  ...editorActions,
  ...projectActions,
  ...tagsActions,
  ...portfolioActions,
};
