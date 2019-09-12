import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './index.scss';
import notAuth from '../../../assets/user-solid.svg';

const UserInfo = withRouter(({ history }) => (
  <div
    className="userinfo"
    onClick={() => {
      history.push('/login');
    }}
  >
    <img src={notAuth} />
  </div>
));

export default UserInfo;
