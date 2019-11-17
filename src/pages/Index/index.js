import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AppHeader from '../../components/AppHeader';
import CodeEditors from '../../components/CodeEditors';
import AppFooter from '../../components/AppFooter';

import * as action from '../../actions';
import './index.scss';

const Home = () => {
  const [currentActiveTab, setCurrentActiveTab] = useState('html');

  return (
    <div className="App">
      <AppHeader
        currentActiveTab={currentActiveTab}
        handleTabClick={target => setCurrentActiveTab(target)}
        isTabVisible
        isShareBtnVisible
      />
      <div className="AppContent">
        <CodeEditors currentActiveTab={currentActiveTab} />
      </div>
      <AppFooter />
    </div>
  );
};

const mapStateToProps = store => ({
  user: store.user,
  editor: store.editor,
});
export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(Home),
);
