import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isRequired } from 'calidators';

import action from '../../actions';
import Layout from '../../components/Layout';
import TextArea from '../../components/TextArea';
import TextInput from '../../components/TextInput';
import Select from '../../components/Select';
import MultiSelect from '../../components/MultiSelect';
import EditProjectList from '../../components/EditProjectList';
import Button from '../../components/Button';
import userImg from '../../assets/userImg.png';

import './index.scss';

const EditResume = (props) => {
  const [id, setID] = useState('');
  const [editNewPwpassword, setPassword] = useState('');

  const [userName, setUserName] = useState('Alice');
  const [list, setList] = useState(['作品集', '圖表分析', '帳戶設定']);
  const fakeOptions = ['React', 'Vue', 'Angular', 'jQuery', 'CSS', 'HTML'];
  const educateEntryOptions = ['1900', '1901', '', '', '', ''];
  const educateExistOptions = ['1900', '1901', '', '', '', ''];
  const expStartYearOptions = ['1900', '', '', '', '', ''];
  const expStartMonthOptions = ['1900', '', '', '', '', ''];

  const [isEntryYearOpen, setIsEntryYearOpen] = useState(false);
  const [isExistYearOpen, setIsExistYearOpen] = useState(false);
  const [isStartYearOpen, setIsStartYearOpen] = useState(false);
  const [isStartMonthOpen, setIsStartMonthOpen] = useState(false);
  const [aboutDesc, setAboutDesc] = useState('');
  const [educateSchool, setEducateSchool] = useState('');
  const [educateDegree, setEducateDegree] = useState('');
  const [educateMajor, setEducateMajor] = useState('');
  const [educateEntryYear, setEducateEntryYear] = useState([]);
  const [educateExistYear, setEducateExistYear] = useState([]);
  const [expStartYear, setExpStartYear] = useState([]);
  const [expStartMonth, setExpStartMonth] = useState([]);
  const [expJob, setExpJob] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expPlace, setExpPlace] = useState('');
  const [expDesc, setExpDesc] = useState('');
  const [projectTags, setProjectTags] = useState([]);

  const educateSchoolValidator = isRequired({ message: '請輸入學校名稱' })(educateSchool);
  const educateDegreeValidator = isRequired({ message: '請輸入學位' })(educateDegree);
  const educateEntryYearValidator = isRequired({ message: '請輸入年份' })(educateEntryYear, educateExistYear);
  const expJobValidator = isRequired({ message: '請輸入職稱' })(expJob);
  const expCompanyValidator = isRequired({ message: '請輸入公司名稱' })(expCompany);
  const expPlaceValidator = isRequired({ message: '地點' })(expPlace);

  const loginHandler = () => {
    const loginData = {
      id,
      password,
    };
    props.login(loginData, props.history);
  };
  const handleEditResume = () => {
    const settingsData = {
      educateSchool,
      educateDegree,
      educateEntryYear,
      educateExistYear,
      expJob,
      expCompany,
      expPlace,
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
            <div className="container">
              <TextArea
                title="簡介"
                placeholder="用150字簡短介紹自己吧！"
                text={aboutDesc}
                onChange={e => setAboutDesc(e.target.value)}
              />
            </div>
          </div>
          <div className="edit_educate">
            <h2 className="title">學歷</h2>
            <div className="container">
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
              <div className="selects">
                <Select
                  title="入學年份"
                  required
                  isOpen={isEntryYearOpen}
                  switchOptionHandler={setIsEntryYearOpen}
                  options={educateEntryOptions}
                />
                <Select
                  title="畢業年份"
                  required
                  isOpen={isExistYearOpen}
                  switchOptionHandler={setIsExistYearOpen}
                  options={educateExistOptions}
                />
              </div>
            </div>
          </div>
          <div className="edit_skill">
            <h2 className="title">
              技能
              <span className="subtitle">限25個</span>
            </h2>
            <div className="container">
              <MultiSelect
                title="新增技能"
                options={fakeOptions}
                selectedItems={projectTags}
                onChange={setProjectTags}
              />
            </div>
          </div>
          <div className="edit_exp">
            <div className="edit_exp_top">
              <h2 className="title">
                經歷
                <span className="subtitle">限3個</span>
              </h2>
              <Button
                className="add_btn"
                text="新增"
                type="outline"
                size="small"
              // onClick={addExpBtn}
              />
            </div>
            <div className="container">
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
              <div className="selects">
                <Select
                  title="開始年份"
                  isOpen={isStartYearOpen}
                  switchOptionHandler={setIsStartYearOpen}
                  options={expStartYearOptions}
                />
                <Select
                  title="開始月份"
                  options={expStartMonthOptions}
                  isOpen={isStartMonthOpen}
                  switchOptionHandler={setIsStartMonthOpen}
                />
              </div>
              <TextArea
                title="工作內容"
                placeholder="說明您在這份工作中扮演的角色和成果"
                text={expDesc}
                onChange={e => setExpDesc(e.target.value)}
              />
              <div className="exp_button">
                <Button
                  className="delete_btn"
                  text="刪除"
                  type="primary"
                  size="small"
                  theme="red"
                // onClick={deleteExpBtn}
                />
              </div>
            </div>
          </div>
          <div className="edit_project">
            <h2 className="title">作品</h2>
            <EditProjectList
              projectName="1234"
              projectDescription="1234"
              isShowCloseIcon
            />
          </div>
          <div className="edit_button">
            <Button
              className="cancel_btn"
              text="取消"
              type="outline"
              size="small"
              onClick={() => props.history.push('/homePage')}
            />
            <Button
              className="save_btn"
              text="儲存"
              type="primary"
              size="small"
              onClick={handleEditResume}
              disabled={
                educateSchoolValidator !== null
                || educateDegreeValidator !== null
                || educateEntryYearValidator !== null
                || expJobValidator !== null
                || expCompanyValidator !== null
                || expPlaceValidator !== null
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
  )(EditResume),
);
