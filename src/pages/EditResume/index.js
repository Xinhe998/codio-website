import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isRequired, isEmail, isNumber, hasDigit, isEqual, } from 'calidators';

import action from '../../actions';
import Layout from '../../components/Layout';
import TextArea from '../../components/TextArea';
import TextInput from '../../components/TextInput';
import MultiSelect from '../../components/MultiSelect';
import ProjectList from '../../components/ProjectList';
import Button from '../../components/Button';
import userImg from '../../assets/userImg.png';

import './index.scss';

const EditResume = (props) => {
  const [id, setID] = useState('');
  const [editNewPwpassword, setPassword] = useState('');

  const [userName, setUserName] = useState('Alice');
  const [list, setList] = useState(['作品集', '圖表分析', '帳戶設定']);

  const [aboutDesc, setAboutDesc] = useState('');
  const [educateSchool, setEducateSchool] = useState('');
  const [educateDegree, setEducateDegree] = useState('');
  const [educateMajor, setEducateMajor] = useState('');
  const [expJob, setExpJob] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expPlace, setExpPlace] = useState('');
  const [expDesc, setExpDesc] = useState('');


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

  const [themeColor, setThemeColor] = useState('深藍色');
  const themeColorOptions = ['深藍色', '黑色', '淺色'];
  const [defaultOpen, setDefaultOpen] = useState('HTML');
  const defaultOptions = ['HTML', 'CSS', 'JS', 'Console', 'View'];

  const loginHandler = () => {
    const loginData = {
      id,
      password,
    };
    props.login(loginData, props.history);
  };
  const handleEditInfo = () => {
    const settingsData = {
      editUserName,
      editCounty,
      editUrl,
      editJob,
      editEmail,
      editBirth,
      editTel,
      editAddress,
    };
    props.settings(settingsData, props.history);
  };
  const handleEditPw = () => {
    const settingsData = {
      editOldPw,
      editNewPw,
      confirmNewPw,
    };
    props.settings(settingsData, props.history);
  };


  return (
    <div className="editResume">
      <Layout
        userImg={userImg}
        userName={userName}
        list={list}
      >
        <div className="main_section">
          <div className="edit_about">
            <h2 className="title">關於</h2>
            <TextArea
              title="簡介"
              placeholder="用150字簡短介紹自己吧！"
              text={aboutDesc}
              onChange={e => setAboutDesc(e.target.value)}
            />
          </div>
          <div className="edit_educate">
            <h2 className="title">學歷</h2>
            <TextInput
              title="學校"
              type="text"
              placeholder="例：國立臺中科技大學"
              text={educateSchool}
              onChange={e => setEducateSchool(e.target.value)}
              required
            />
            <TextInput
              title="學位"
              type="text"
              placeholder="學士"
              text={educateDegree}
              onChange={e => setEducateDegree(e.target.value)}
              required
            />
            <TextInput
              title="科系類別"
              type="text"
              placeholder="例：資訊管理系"
              text={educateMajor}
              onChange={e => setEducateMajor(e.target.value)}
            />
          </div>
          <div className="edit_skill">
            <h2 className="title">
              技能
              <span>限25個</span>
            </h2>
            <MultiSelect
              title="新增技能"
            // options={fakeOptions}
            // selectedItems={projectTags}
            // onChange={setProjectTags}
            />
          </div>
          <div className="edit_exp">
            <h2 className="title">經歷</h2>
            <TextInput
              title="職稱"
              type="text"
              placeholder="例：前端工程師"
              text={expJob}
              onChange={e => setExpJob(e.target.value)}
              required
            />
            <TextInput
              title="公司名稱"
              type="text"
              text={expCompany}
              onChange={e => setExpCompany(e.target.value)}
              required
            />
            <TextInput
              title="地點"
              type="text"
              placeholder="例：台灣台北"
              text={expPlace}
              onChange={e => setExpPlace(e.target.value)}
              required
            />
            <TextArea
              title="工作內容"
              placeholder="說明您在這份工作中扮演的角色和成果"
              text={expDesc}
              onChange={e => setExpDesc(e.target.value)}
            />
          </div>
          <div className="edit_project">
            <h2 className="title">作品</h2>
            <ProjectList />
          </div>
          <div className="edit_button">
            <Button
              className="cancel_btn"
              text="取消"
              type="outline"
              size="small"
            // onClick={() => props.history.push('/homePage')}
            />
            <Button
              className="save_btn"
              text="儲存"
              type="primary"
              size="small"
              onClick={handleEditPw}
            // disabled={
            // }
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
  )(EditResume),
);
