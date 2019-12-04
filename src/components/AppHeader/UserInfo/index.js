import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import action from '../../../actions';

import './index.scss';
import notAuth from '../../../assets/user-solid.svg';
import defaultAvatar from '../../../assets/default_avatar.jpg';

const UserInfo = withRouter(({ history, user }) => {
  const isAuthed = user.token;
  return (
    <div
      className="userinfo"
      onClick={() => {
        if (!isAuthed) history.push('/login');
        else history.push('/homepage');
      }}
      style={{
        backgroundImage: isAuthed
          ? `url(${user.m_avatar || defaultAvatar})`
          : `url(${notAuth})`,
      }}
    >
      {!isAuthed && <img src={notAuth} />}
    </div>
  );
});

const mapStateToProps = (store) => ({
  user: store.user,
});

export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(UserInfo),
);
