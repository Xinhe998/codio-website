import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isRequired, isEmail } from 'calidators';
import action from '../actions';

import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Modal from '../components/Modal';

import './index.scss';
import './ForgetPassword.scss';

const ForgetPassword = ({ location }) => {
  const { state = {} } = location;
  const { modal } = state;
  const [email, setEmail] = useState('');
  const emailValidator = isRequired({ message: '請輸入E-mail' })(email);
  const emailValidator2 = isEmail({ message: '請輸入正確的Email' })(email);

  return modal ? (
    <Modal
      isOpen
      title="忘記密碼"
      onClose={() => {}}
      shouldCloseOnEsc
      showControlBtn={false}
    >
      <p>請輸入當時註冊的信箱來接收一個暫時的密碼</p>
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
        onClick={() => {}}
        disabled={emailValidator !== null || emailValidator2 !== null}
      />
    </Modal>
  ) : (
    <div>
      <p>請輸入當時註冊的信箱來接收一個暫時的密碼</p>
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
        onClick={() => {}}
        disabled={emailValidator !== null || emailValidator2 !== null}
      />
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
