import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isRequired, isEmail } from 'calidators';
import action from '../../actions';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import AppHeader from '../../components/AppHeader';

import '../Index/index.scss';
import './index.scss';

import mockup from '../../assets/smartmockups_jxfuqv8i.jpg';

const ForgetPassword = (props) => {
  const [email, setEmail] = useState('');
  const emailValidator = isRequired({ message: '請輸入E-mail' })(email);
  const emailValidator2 = isEmail({ message: '請輸入正確的Email' })(email);

  const forgetPasswordHandler = () => {
    const forgetPasswordData = {
      email,
    };
    props.forgetPassword(forgetPasswordData, props.history);
  };

  return (
    <div className="ForgetPassword">
      <AppHeader isDropdownVisible={false} isTabVisible={false} isUserBtnVisible={false} />
      <div className="AppContent">
        <div
          className="photo-section"
          style={{ backgroundImage: `url(${mockup})` }}
        />
        <div className="form-section">
          <p className="title">忘記密碼</p>
          <p className="extrainfo">
            請輸入當時註冊的信箱來接收一個暫時的密碼
          </p>
          <form>
            <TextInput
              title="E-mail"
              text={email}
              showHint={false}
              hintType="ok"
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Button
              className="submit_btn"
              text="送出"
              type="primary"
              size="small"
              onClick={forgetPasswordHandler}
              disabled={emailValidator !== null || emailValidator2 !== null}
            />
          </form>
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
  )(ForgetPassword),
);
