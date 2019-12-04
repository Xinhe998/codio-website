import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { isRequired, isNumber, hasDigit, isEqual } from 'calidators';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import action from '../../actions';
import Layout from '../../components/Layout';
import TextInput from '../../components/TextInput';
import DateInput from '../../components/DateInput';
import Select from '../../components/Select';
import RadioButtonGroup from '../../components/RadioButtonGroup';
import Button from '../../components/Button';
// import CheckboxGroup from '../../components/CheckboxGroup';
import userImg from '../../assets/userImg.png';

import './index.scss';
import defaultAvatar from '../../assets/default_avatar.jpg';

const Settings = (props) => {
  const [id, setID] = useState('');
  const [editNewPwpassword, setPassword] = useState('');

  const [userName, setUserName] = useState(props.user.m_name);
  const [list, setList] = useState(['作品集', '圖表分析', '帳戶設定']);
  const [userAccount, setUserAccount] = useState(props.user.m_account);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editUserName, setEditUserName] = useState(props.user.m_name);
  const [editUrl, setEditUrl] = useState(props.user.m_website);
  const [editJob, setEditJob] = useState(props.user.m_position);
  const [editBirth, setEditBirth] = useState(
    props.user.m_birthday
      ? new Date(props.user.m_birthday.substring(0, 10).replace('-', '/'))
      : new Date(),
  );
  const [isBirthOnFocus, setIsBirthOnFocus] = useState(false);
  const [editTel, setEditTel] = useState(props.user.m_phone);
  const [editAddress, setEditAddress] = useState(props.user.m_address);
  const [editOldPw, setEditOldPw] = useState('');
  const [editNewPw, setEditNewPw] = useState('');
  const [confirmNewPw, setConfirmNewPw] = useState('');

  const userNameValidator = isRequired({ message: '請輸入使用者名稱' })(
    editUserName,
  );
  const telValidator = isRequired({ message: '請輸入聯絡電話' })(editTel);
  const addressValidator = isRequired({ message: '請輸入通訊地址' })(
    editAddress,
  );
  const passwordValidator1 = isRequired({ message: '請輸入密碼' })(
    editOldPw,
    editNewPw,
    confirmNewPw,
  );
  const passwordValidator2 = isNumber({ message: '密碼需包含英文及數字' })(
    editNewPw,
  );
  const passwordValidator3 = hasDigit({ message: '密碼需包含英文及數字' })(
    editNewPw,
  );
  const confirmPasswordValidator = isEqual({
    message: '確認密碼不一致，請重新輸入',
    value: editNewPw,
  })(confirmNewPw);

  const [themeColor, setThemeColor] = useState('深藍色');
  const themeColorOptions = ['深藍色', '黑色', '淺色'];
  const editCountyOptions = [
    '基隆市',
    '台北市',
    '新北市',
    '桃園縣',
    '新竹市',
    '新竹縣',
    '苗栗縣',
    '台中市',
    '彰化縣',
    '南投縣',
    '雲林縣',
    '嘉義市',
    '嘉義縣',
    '台南市',
    '高雄市',
    '屏東縣',
    '台東縣',
    '花蓮縣',
    '宜蘭縣',
    '澎湖縣',
    '金門縣',
    '連江縣',
  ];

  const [isAvatarUploading, seAvatartIsUplaoding] = useState(false);
  const [avatar, setAvatar] = useState([]);

  // upload image to imgur
  const uploadImage = (img) => {
    if (process.env.NODE_ENV === 'production' || process.env.CIRCLECI) {
      var { imgurClient } = process.env;
    } else {
      var { imgurClient } = require('../../../config/project_config');
    }
    const formData = new FormData();
    formData.append('image', img); // required
    axios({
      method: 'POST',
      url: 'https://api.imgur.com/3/image',
      data: formData,
      headers: {
        'Content-Type': 'text',
        Authorization: `Client-ID ${imgurClient}`,
      },
      mimeType: 'multipart/form-data',
    })
      .then((res) => {
        console.log(res);
        seAvatartIsUplaoding(false);
        setAvatar(res.data.data);
        const settingsData = {
          token: props.user.token,
          data: {
            m_no: props.user.m_no,
            m_sex: props.user.m_sex,
            m_account: props.user.m_account,
            m_name: props.user.m_name,
            m_address: props.user.m_address,
            // m_address_title:
            m_phone: props.user.m_phone,
            m_birthday: props.user.m_birthday,
            m_position: props.user.m_position,
            m_like: props.user.m_like,
            m_website: props.user.m_website,
            m_avatar: res.data.data.link,
            role_no: props.user.role_no,
          },
        };
        props.updatePersonalInfo(settingsData);
      })
      .catch((e) => {
        console.log(e);
        seAvatartIsUplaoding(false);
      });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: (acceptedFiles) => {
      seAvatartIsUplaoding(true);
      uploadImage(acceptedFiles[0]);
    },
  });
  const imgPreviewUrl = avatar.link;
  const handleEditInfo = () => {
    const settingsData = {
      token: props.user.token,
      data: {
        m_no: props.user.m_no,
        m_sex: props.user.m_sex,
        m_account: props.user.m_account,
        m_name: editUserName,
        m_address: editAddress,
        // m_address_title:
        m_phone: editTel,
        m_birthday: editBirth,
        m_position: editJob,
        m_like: props.user.m_like,
        m_website: editUrl,
      },
    };
    props.updatePersonalInfo(settingsData, props.history);
  };
  const handleEditPw = () => {
    const passwordData = {
      token: props.user.token,
      m_account: props.user.m_account,
      oldPassword: editOldPw,
      newPassword: editNewPw,
    };
    props.updatePassword(passwordData, props.history);
  };
  const handleSubmitThemeColor = () => {
    const settingsData = {
      token: props.user.token,
      data: {
        m_no: props.user.m_no,
        m_sex: props.user.m_sex,
        m_account: props.user.m_account,
        m_like: themeColor,
      },
    };
    props.updatePersonalInfo(settingsData, props.history);
  };

  const handleThemeColor = (theme_text) => {
    let theme = '';
    switch (theme_text) {
      case '深藍色':
        theme = 'navy';
        break;
      case '黑色':
        theme = 'black';
        break;
      default:
        theme = 'light';
        break;
    }
    return theme;
  };

  return (
    <div className="settings">
      <Layout
        userImg={props.user.m_avatar || defaultAvatar}
        userName={props.user.m_name}
        list={list}
      >
        <div className="main_section">
          <div className="edit_info">
            <h2 className="title">個人資料</h2>
            <div className="tooltip">
              <div
                className="avatar_dropzone"
                {...getRootProps()}
                style={
                  props.user.m_avatar
                    ? {
                        backgroundImage: `url("${defaultAvatar}")`,
                      }
                    : {
                        backgroundImage: `url("${imgPreviewUrl || props.user.m_avatar || defaultAvatar}")`,
                      }
                }
              >
                <input {...getInputProps()} />
              </div>
              <span className="tooltiptext">編輯大頭貼</span>
            </div>
            <p>
              Hi，
              {userAccount}! ｜ <span className="subtitle">一般會員</span>
            </p>
            <div className="inputs">
              <div className="sec1">
                <TextInput
                  title="使用者名稱"
                  type="text"
                  text={editUserName}
                  onChange={(e) => setEditUserName(e.target.value)}
                  required
                />
                <div className="right_sec_address">
                  <Select
                    title="縣市"
                    options={editCountyOptions}
                    isOpen={isDropdownOpen}
                    switchOptionHandler={setIsDropdownOpen}
                    required
                  />
                  <TextInput
                    title="地址"
                    type="text"
                    text={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="sec2">
                <TextInput
                  title="連結"
                  type="url"
                  text={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
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
              </div>
              <div className="sec3">
                <TextInput
                  title="職稱"
                  type="text"
                  text={editJob}
                  onChange={(e) => setEditJob(e.target.value)}
                />
                <div className="tel_input">
                  <TextInput
                    title="聯絡電話"
                    type="tel"
                    text={editTel}
                    onChange={(e) => setEditTel(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="edit_button">
              <Button
                className="save_btn"
                text="儲存"
                type="primary"
                size="small"
                onClick={handleEditInfo}
                disabled={
                  userNameValidator !== null ||
                  telValidator !== null ||
                  addressValidator !== null
                }
              />
            </div>
          </div>
          <div className="edit_pw">
            <h2 className="title">修改密碼</h2>
            <TextInput
              title="舊密碼"
              type="password"
              text={editOldPw}
              onChange={(e) => setEditOldPw(e.target.value)}
              required
              hintType="error"
              showHint={editOldPw !== '' && passwordValidator1 !== null}
              hintText={passwordValidator1}
            />
            <TextInput
              title="新密碼"
              type="password"
              text={editNewPw}
              onChange={(e) => setEditNewPw(e.target.value)}
              required
              hintType="error"
              showHint={
                editNewPw !== '' &&
                (passwordValidator2 === null || passwordValidator3 !== null)
              }
              hintText={passwordValidator3}
            />
            <TextInput
              title="確認新密碼"
              type="password"
              text={confirmNewPw}
              onChange={(e) => setConfirmNewPw(e.target.value)}
              required
              showHint={
                confirmNewPw !== '' && confirmPasswordValidator !== null
              }
              hintType="error"
              hintText={confirmPasswordValidator}
            />
            <div className="edit_button">
              <Button
                className="save_btn"
                text="儲存"
                type="primary"
                size="small"
                onClick={handleEditPw}
                disabled={
                  passwordValidator1 !== null ||
                  passwordValidator2 === null ||
                  passwordValidator3 !== null ||
                  confirmPasswordValidator !== null
                }
              />
            </div>
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
              {/* <CheckboxGroup
              name="themeColor"
              options={defaultOptions}
              value={defaultOpen}
              onChange={setDefaultOpen}
              title="預設開啟"
              required
            /> */}
            </div>
            <div className="editor">
              <div className="editor_top">
                <span className="circle red" />
                <span className="circle yellow" />
                <span className="circle green" />
              </div>
              <div className={cx('editor_body', handleThemeColor(themeColor))}>
                <span className="editor_body_title">HTML</span>
              </div>
            </div>
          </div>
          <div className="edit_button">
            <Button
              className="save_btn"
              text="儲存"
              type="primary"
              size="small"
              onClick={handleSubmitThemeColor}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

const mapStateToProps = (store) => ({
  user: store.user,
  editor: store.editor,
});
export default withRouter(connect(mapStateToProps, action)(Settings));
