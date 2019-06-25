import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AppHeader from '../components/AppHeader';
import Editors from '../components/Editors';
import AppFooter from '../components/AppFooter';

import * as action from '../actions';
import './index.scss';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      currentActiveTab: 'html',
    };
  }

  handleTabClick = (target) => {
    this.setState({
      currentActiveTab: target,
    });
  };

  render() {
    return (
      <div className="App">
        <AppHeader
          currentActiveTab={this.state.currentActiveTab}
          handleTabClick={this.handleTabClick}
        />
        <div className="AppContent">
          <Editors currentActiveTab={this.state.currentActiveTab} />
        </div>
        <AppFooter />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  editor: store.editor,
});
export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(Home),
);
