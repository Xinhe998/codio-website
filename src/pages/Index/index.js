import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactNotifications from 'react-notifications-component';

import AppHeader from '../../components/AppHeader';
import CodeEditors from '../../components/CodeEditors';
import AppFooter from '../../components/AppFooter';

import action from '../../actions';
import './index.scss';

const notfound = () => <h1>404 Not Found.</h1>;

const Home = ({ editor, resetAll, needAuth }) => {
  const [currentActiveTab, setCurrentActiveTab] = useState('html');
  const [errorMsg, setErrorMsg] = useState(editor.errorMsg);

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    setErrorMsg(editor.errorMsg);
  }, [editor]);

  return (
    <div className="App">
      <ReactNotifications />
      {!errorMsg || !needAuth ? (
        <React.Fragment>
          <AppHeader
            currentActiveTab={currentActiveTab}
            handleTabClick={(target) => setCurrentActiveTab(target)}
            isTabVisible
            isShareBtnVisible
          />
          <div className="AppContent">
            <CodeEditors currentActiveTab={currentActiveTab} />
          </div>
          <AppFooter />
        </React.Fragment>
      ) : (
        <Route exact component={notfound} />
      )}
    </div>
  );
};


Home.propTypes = {
  needAuth: PropTypes.bool,
};

Home.defaultProps = {
  needAuth: true,
};

const mapStateToProps = (store) => ({
  user: store.user,
  editor: store.editor,
});
export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(Home),
);
