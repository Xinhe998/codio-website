import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isRequired, isEqual, isEmail, isNumber, hasDigit } from 'calidators';
import action from '../../actions';

import AppHeader from '../../components/AppHeader';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import DateInput from '../../components/DateInput';

import '../Index/index.scss';
import './index.scss';

import mockup from '../../assets/smartmockups_jxfuqv8i.jpg';

const Register = (props) => {
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState(new Date());
  const [address, setAddress] = useState('');
  const [isBirthOnFocus, setIsBirthOnFocus] = useState(false);

  const idValidator = isRequired({ message: '請輸入帳號' })(id);
  const emailValidator = isEmail({ message: 'Email格式錯誤' })(id);
  const passwordValidator1 = isRequired({ message: '請輸入密碼' })(password);
  const passwordValidator2 = isNumber({ message: '密碼需包含英文及數字' })(
    password,
  );
  const passwordValidator3 = hasDigit({ message: '密碼需包含英文及數字' })(
    password,
  );
  const nameValidator = isRequired({ message: '請輸入使用者名稱' })(name);
  const confirmPasswordValidator1 = isRequired({ message: '請輸入確認密碼' })(
    confirmPassword,
  );
  const confirmPasswordValidator2 = isEqual({
    message: '確認密碼不一致，請重新輸入',
    value: password,
  })(confirmPassword);

  const handleRegister = () => {
    const registerData = {
      id,
      password,
      name,
      phone,
      birth,
      address,
    };
    props.register(registerData, props.history);
  };
  return (
    <div className="Register">
      <AppHeader
        isDropdownVisible={false}
        isTabVisible={false}
        isUserBtnVisible={false}
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
            <a href="login">點我登入</a>
          </p>
          {currentStep === 1 ? (
            <form>
              <TextInput
                title="帳號"
                text={id}
                showHint={
                  id !== '' &&
                  !(idValidator !== null || emailValidator !== null)
                }
                hintType="ok"
                placeholder="請輸入您的E-mail"
                onChange={(e) => setID(e.target.value)}
                required
              />
              <TextInput
                title="密碼"
                text={password}
                type="password"
                hintType="error"
                showHint={
                  password !== '' &&
                  (passwordValidator2 === null || passwordValidator3 !== null)
                }
                hintText={passwordValidator3}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <TextInput
                title="確認密碼"
                text={confirmPassword}
                type="password"
                showHint={
                  confirmPassword !== '' && confirmPasswordValidator2 !== null
                }
                hintType="error"
                hintText={confirmPasswordValidator2}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <TextInput
                title="姓名"
                text={name}
                hintType="error"
                showHint={name !== '' && nameValidator !== null}
                hintText={nameValidator}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Button
                className="next_btn"
                text="下一步"
                type="link"
                theme="blue"
                onClick={() => setCurrentStep(2)}
                disabled={
                  idValidator !== null ||
                  passwordValidator1 !== null ||
                  passwordValidator2 === null ||
                  passwordValidator3 !== null ||
                  nameValidator !== null ||
                  confirmPasswordValidator1 !== null ||
                  confirmPasswordValidator2 !== null
                }
              />
            </form>
          ) : null}
          {currentStep === 2 ? (
            <form>
              <DateInput
                title="生日"
                placeholder="dd/mm/yyyy"
                defaultDate={birth}
                onSelect={setBirth}
                disabledPastDate={false}
                isOpenDatePicker={isBirthOnFocus}
                onFocus={() => setIsBirthOnFocus(true)}
                switchHandler={setIsBirthOnFocus}
                required
                // onBlur={() => setIsBirthOnFocus(false)}
              />
              <TextInput
                title="聯絡電話"
                text={phone}
                showHint={false}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextInput
                title="通訊地址"
                text={address}
                showHint={false}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Button
                className="register_btn"
                text="註冊"
                type="primary"
                size="small"
                onClick={handleRegister}
                disabled={
                  idValidator !== null ||
                  passwordValidator1 !== null ||
                  passwordValidator2 === null ||
                  passwordValidator3 !== null ||
                  nameValidator !== null ||
                  birth === '' ||
                  confirmPasswordValidator1 !== null ||
                  confirmPasswordValidator2 !== null
                }
              />
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => ({
  user: store.user,
});
export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(Register),
);
