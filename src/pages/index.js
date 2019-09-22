import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AppHeader from '../components/AppHeader';
import Editors from '../components/Editors';
import AppFooter from '../components/AppFooter';

import * as action from '../actions';
import './index.scss';

const Home = () => {
  const [currentActiveTab, setCurrentActiveTab] = useState('html');

  return (
    <div className="App">
      <AppHeader
        currentActiveTab={currentActiveTab}
        handleTabClick={target => setCurrentActiveTab(target)}
        isDropdownVisible
        isTabVisible
      />
      <div className="AppContent">
        <Editors currentActiveTab={currentActiveTab} />
      </div>
      <AppFooter />
    </div>
  );
};

const mapStateToProps = store => ({
  editor: store.editor,
});
export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(Home),
);
