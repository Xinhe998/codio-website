import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isRequired, isEqual } from 'calidators';
import action from '../actions';

import AppHeader from '../components/AppHeader';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

import './index.scss';
import './Register.scss';

import mockup from '../assets/smartmockups_jxfuqv8i.jpg';

const Register = (props) => {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentActiveTab, setCurrentActiveTab] = useState('');

  const emailValidator = isRequired({ message: '請輸入帳號' })(id);
  const passwordValidator = isRequired({ message: '請輸入密碼' })(password);
  const nameValidator = isRequired({ message: '請輸入使用者名稱' })(name);
  const confirmPasswordValidator1 = isRequired({ message: '請輸入確認密碼' })(confirmPassword);
  const confirmPasswordValidator2 = isEqual({ message: '請輸入確認密碼', password })(confirmPassword);

  const loginHandler = () => {
    const loginData = {
      id,
      password,
    };
    props.login(loginData);
  };
  return (
    <div className="Register">
      <AppHeader
        currentActiveTab={currentActiveTab}
        isDropdownVisible={false}
        isTabVisible={false}
      />
      <div className="AppContent">
        <div
          className="photo-section"
          style={{ backgroundImage: `url(${mockup})` }}
        />
        <div className="form-section">
          <p className="title">註冊</p>
          <p className="extrainfo">
            有帳號了嗎？
            <a href="register">點我登入</a>
          </p>
          <TextInput
            title="帳號"
            text={id}
            showHint={false}
            onChange={e => setID(e.target.value)}
            required
          />
          <TextInput
            title="使用者名稱"
            text={name}
            showHint={false}
            onChange={e => setName(e.target.value)}
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
          <TextInput
            title="確認密碼"
            text={confirmPassword}
            type="password"
            showHint={false}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            className="next_btn"
            text="下一步"
            type="link"
            size="small"
            onClick={loginHandler}
            disabled={emailValidator || passwordValidator}
          />
        </div>
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
  )(Register),
);
