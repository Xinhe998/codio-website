import * as userActions from './user';
import * as editorActions from './editor';
import * as projectActions from './project';
import * as tagsActions from './tags';
import * as portfolioActions from './portfolio';
import * as resumeActions from './resume';

export default {
  ...userActions,
  ...editorActions,
  ...projectActions,
  ...tagsActions,
  ...portfolioActions,
  ...resumeActions,
};
