import React, { useState } from 'react';
import {
  withRouter, Link, Switch, Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import { isRequired } from 'calidators';
import { IoIosCloseCircle } from 'react-icons/io';
import action from '../actions';

import Layout from '../components/Layout';
// import AppHeader from '../components/AppHeader';
// import TextInput from '../components/TextInput';
import Button from '../components/Button';
import UserList from '../components/UserList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';

import './Admin.scss';

import mockup from '../assets/smartmockups_jxfuqv8i.jpg';

const Admin = (props) => {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');

  const emailValidator = isRequired({ message: '請輸入帳號' })(id);
  const passwordValidator = isRequired({ message: '請輸入密碼' })(password);

  const loginHandler = () => {
    const loginData = {
      id,
      password,
    };
    props.login(loginData, props.history);
  };
  return (
    <div className="Admin">
      <Layout>

        <div className="main-section">
          <Button
            className="add_user_btn"
            text="新增角色"
            type="primary"
            size="small"
            theme="red"
            onClick={loginHandler}
          />

          <div className="user-management">
            <SearchBar />
            <Filter />
            <table>
              <tr>
                <td>編號</td>
                <td>會員</td>
                <td>操作</td>
              </tr>
              <tr>
                <UserList />
              </tr>
            </table>
            <span>總共人數：</span>
          </div>

        </div>
      </Layout>


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
  )(Admin),
);
