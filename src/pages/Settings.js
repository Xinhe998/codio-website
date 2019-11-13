import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isRequired, isEmail, isNumber, hasDigit, isEqual, } from 'calidators';

import action from '../actions';
import Layout from '../components/Layout';
import TextInput from '../components/TextInput';
import DateInput from '../components/DateInput';
import RadioButtonGroup from '../components/RadioButtonGroup';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import userImg from '../assets/userImg.png';

import './Settings.scss';


const Settings = (props) => {
  const [id, setID] = useState('');
  const [editNewPwpassword, setPassword] = useState('');

  const [userName, setUserName] = useState('Alice');
  const [list, setList] = useState(['作品集', '圖表分析', '帳戶設定']);

  const [editUserName, setEditUserName] = useState('');
  const [editCounty, setEditCounty] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [editJob, setEditJob] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editBirth, setEditBirth] = useState(new Date());
  const [isBirthOnFocus, setIsBirthOnFocus] = useState(false);
  const [editTel, setEditTel] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editOldPw, setEditOldPw] = useState('');
  const [editNewPw, setEditNewPw] = useState('');
  const [confirmNewPw, setConfirmNewPw] = useState('');

  const userNameValidator = isRequired({ message: '請輸入使用者名稱' })(editUserName);
  const countyValidator = isRequired({ message: '請輸入縣市' })(editCounty);
  const urlValidator = isRequired({ message: '請輸入連結' })(editUrl);
  const jobValidator = isRequired({ message: '請輸入職稱' })(editJob);
  const emailValidator = isEmail({ message: 'Email格式錯誤' })(editEmail);
  const telValidator = isRequired({ message: '請輸入聯絡電話' })(editTel);
  const addressValidator = isRequired({ message: '請輸入通訊地址' })(editAddress);
  const passwordValidator1 = isRequired({ message: '請輸入密碼' })(editOldPw, editNewPw, confirmNewPw);
  const passwordValidator2 = isNumber({ message: '密碼需包含英文及數字' })(editNewPw);
  const passwordValidator3 = hasDigit({ message: '密碼需包含英文及數字' })(editNewPw);
  const confirmPasswordValidator = isEqual({
    message: '確認密碼不一致，請重新輸入',
    value: editNewPw,
  })(confirmNewPw);

  const [isChecked, setIsChecked] = useState([]);
  const [isResumeBtnOpen, setIsResumeBtnOpen] = useState(false);
  const [themeColor, setThemeColor] = useState('深藍色');
  const themeColorOptions = ['深藍色', '黑色', '淺色'];

  const handleSelectCheckbox = (choice) => {
    const index = isChecked.indexOf(choice);
    if (index !== -1) {
      setIsChecked(isChecked.filter(item => item !== choice));
    } else {
      setIsChecked([choice, ...isChecked]);
    }
  };

  const loginHandler = () => {
    const loginData = {
      id,
      password,
    };
    props.login(loginData, props.history);
  };
  const handleEdit = () => {
    const settingsData = {
      id,
      password,
      editUserName,
      editCounty,
      editUrl,
      editJob,
      editEmail,
      editBirth,
      editTel,
      editAddress,
      editOldPw,
      editNewPw,
      confirmNewPw,
    };
    props.settings(settingsData, props.history);
  };

  return (
    <div className="settings">
      <Layout
        userImg={userImg}
        userName={userName}
        list={list}
      >
        <div className="main_section">
          <div className="edit_info">
            <h2 className="title">個人資料</h2>
            <span className="subtitle">一般會員</span>
            <div className="inputs">
              <div className="left_sec">
                <TextInput
                  title="使用者名稱"
                  type="text"
                  text={editUserName}
                  onChange={e => setEditUserName(e.target.value)}
                  required
                // showHint={editUserName !== '' && userNameValidator !== null}
                // hintType="error"
                />
                <TextInput
                  title="縣市"
                  type="text"
                  text={editCounty}
                  onChange={e => setEditCounty(e.target.value)}
                  required
                // showHint={!(countyValidator !== null)}
                // hintType="ok"
                />
                <TextInput
                  title="連結"
                  type="url"
                  text={editUrl}
                  onChange={e => setEditUrl(e.target.value)}
                  required
                // showHint={!(urlValidator !== null)}
                // hintType="ok"
                />
                <TextInput
                  title="職稱"
                  type="text"
                  text={editJob}
                  onChange={e => setEditJob(e.target.value)}
                  required
                // showHint={!(jobValidator !== null)}
                // hintType="ok"
                />
              </div>
              <div className="right_sec">
                <TextInput
                  title="信箱"
                  type="email"
                  text={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  required
                  showHint={editEmail !== '' && (emailValidator !== null)}
                  hintType="error"
                  hintText={emailValidator}
                />
                <DateInput
                  title="生日"
                  required
                  placeholder="dd/mm/yyyy"
                  defaultDate={editBirth}
                  onSelect={setEditBirth}
                  disabledPastDate={false}
                  isOpenDatePicker={isBirthOnFocus}
                  onFocus={() => setIsBirthOnFocus(true)}
                  switchHandler={setIsBirthOnFocus}
                />
                <TextInput
                  title="聯絡電話"
                  type="tel"
                  text={editTel}
                  onChange={e => setEditTel(e.target.value)}
                  required
                // showHint={!(telValidator !== null)}
                // hintType="error"
                />
                <TextInput
                  title="通訊地址"
                  type="text"
                  text={editAddress}
                  onChange={e => setEditAddress(e.target.value)}
                  required
                // showHint={editAddress !== '' && (addressValidator !== null)}
                // hintType="error"
                />
              </div>
            </div>
          </div>
          <div className="edit_pw">
            <h2 className="title">修改密碼</h2>
            <TextInput
              title="舊密碼"
              type="password"
              text={editOldPw}
              onChange={e => setEditOldPw(e.target.value)}
              required
              hintType="error"
              showHint={editOldPw !== '' && (passwordValidator1 !== null)}
              hintText={passwordValidator1}
            />
            <TextInput
              title="新密碼"
              type="password"
              text={editNewPw}
              onChange={e => setEditNewPw(e.target.value)}
              required
              hintType="error"
              showHint={editNewPw !== '' && (passwordValidator2 === null || passwordValidator3 !== null)}
              hintText={passwordValidator3}
            />
            <TextInput
              title="確認新密碼"
              type="password"
              text={confirmNewPw}
              onChange={e => setConfirmNewPw(e.target.value)}
              required
              showHint={
                confirmNewPw !== '' && confirmPasswordValidator !== null
              }
              hintType="error"
              hintText={confirmPasswordValidator}
            />
          </div>
          <div className="edit_settings">
            <div className="selection">
              <h2 className="title">偏好設定</h2>
              <RadioButtonGroup
                name="themeColor"
                options={themeColorOptions}
                value={themeColor}
                onChange={setThemeColor}
                title="主題色"
                required
              />
              <span className="subtitle">預設開啟</span>
              <Checkbox />
            </div>
            <div className="editor">
              <div className="editor_top">
                <span className="circle red" />
                <span className="circle yellow" />
                <span className="circle green" />
              </div>
              <div className="editor_body">
                <span className="editor_body_title">HTML</span>
              </div>
            </div>
          </div>
          <div className="edit_button">
            <Button
              className="cancel_btn"
              text="取消"
              type="outline"
              size="small"
            // onClick={addChar}
            />
            <Button
              className="save_btn"
              text="儲存"
              type="primary"
              size="small"
              onClick={handleEdit}
              disabled={
                userNameValidator !== null
                || countyValidator !== null
                || urlValidator !== null
                || jobValidator !== null
                || telValidator !== null
                || addressValidator !== null
                || passwordValidator1 !== null
                || passwordValidator2 === null
                || passwordValidator3 !== null
                || confirmPasswordValidator !== null
              }
            />
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
  )(Settings),
);
