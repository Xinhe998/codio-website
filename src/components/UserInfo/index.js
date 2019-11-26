import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaUserTag, FaMapMarkerAlt, FaLink } from 'react-icons/fa';
import action from '../../actions';

import './index.scss';

const UserInfo = ({
  userImg,
  userName,
  userJob,
  userAddress,
  userLink,
}) => (
  <div className="user_profile">
    <div className="user_img" style={{ backgroundImage: `url(${userImg})`}} />
    <div className="user_text">
      <h2>{userName}</h2>
      <span>
        <FaUserTag />
        {userJob}
      </span>
      <span>
        <FaMapMarkerAlt />
        {userAddress}
      </span>
      <span className="user_url">
        <FaLink />
        <a href={`http://${userLink}`} target="_blank">{userLink}</a>
      </span>
    </div>
  </div>

);

UserInfo.propTypes = {
  userImg: PropTypes.string,
  userName: PropTypes.string,
  userJob: PropTypes.string,
  userAddress: PropTypes.string,
  userLink: PropTypes.string,
};

UserInfo.defaultProps = {
  userName: '',
  userJob: '',
  userAddress: '',
  userLink: '',
};

const mapStateToProps = store => ({
  user: store.user,
  editor: store.editor,
});
export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(UserInfo),
);
