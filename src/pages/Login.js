import React, { useState } from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { isRequired } from 'calidators';
import { IoIosCloseCircle } from 'react-icons/io';
import action from '../actions';

import AppHeader from '../components/AppHeader';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

import './index.scss';
import './Login.scss';

import mockup from '../assets/smartmockups_jxfuqv8i.jpg';

const Login = (props) => {
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
    <div className="Login">
      <AppHeader
        isDropdownVisible={false}
        isTabVisible={false}
      />
      <div className="AppContent">
        <div className="form-section">
          <p className="title">登入</p>
          <p className="extrainfo">
            還沒有帳號嗎？
            <a href="register">點我註冊</a>
          </p>
          {props.user.errorMsg
            ? (
              <div className="error-message">
                <IoIosCloseCircle />
              帳號或密碼有誤，請重新再輸入一次
              </div>
            )
            : null}
          <TextInput
            title="帳號"
            text={id}
            showHint={false}
            onChange={e => setID(e.target.value)}
            required
          />
          <TextInput
            title="密碼"
            text={password}
            type="password"
            showHint={false}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button className="forget_password_btn" text="忘記密碼？" type="link" theme="red" />
          <Link
            to={{
              pathname: '/forget_password',
              state: { modal: true },
            }}
            className="forget_password_btn"
          >
            忘記密碼？
          </Link>
          <Button
            className="login_btn"
            text="登入"
            type="primary"
            size="small"
            onClick={loginHandler}
            disabled={emailValidator !== null || passwordValidator !== null}
          />
          <Button className="github_login_btn" text="Github 登入" type="outline" size="small" />
        </div>
        <div
          className="photo-section"
          style={{ backgroundImage: `url(${mockup})` }}
        />
      </div>
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
  )(Login),
);
