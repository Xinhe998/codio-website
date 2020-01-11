import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import action from '../../actions';

import Layout from '../../components/Layout';
import CheckboxGroup from '../../components/CheckboxGroup';

import './index.scss';

const MyDashboard = (props) => {
  const layoutOptions = [
    { text: '作品集', link: '/homepage' },
    { text: '帳號管理', link: '/settings' },
  ];
  const collaborative_mode_options = ['On', 'Off'];
  return (
    <div className="MyDashboard">
      <Layout
        userImg={props.user.m_avatar || defaultAvatar}
        userName={props.user.m_name}
        list={layoutOptions}
      >
        <div className="main_section">
          <h2 className="title">程式專案</h2>
          <CheckboxGroup
            name="collaborative_mode"
            options={collaborative_mode_options}
            value={props.settings.collborative_mode ? 'On' : 'Off'}
            onChange={(mode) => props.updateCollaborativeMode(mode)}
            title="共同編輯模式"
            required
          />
        </div>
      </Layout>
    </div>
  );
};

const mapStateToProps = (store) => ({
  user: store.user,
  settings: store.settings,
});
export default withRouter(connect(mapStateToProps, action)(MyDashboard));
