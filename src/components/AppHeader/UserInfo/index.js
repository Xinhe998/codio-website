import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import notAuth from '../../../assets/user-solid.svg';

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="userinfo">
        <img src={notAuth} />
      </div>
    );
  }
}

UserInfo.propTypes = {
};

UserInfo.defaultProps = {
};
export default UserInfo;
