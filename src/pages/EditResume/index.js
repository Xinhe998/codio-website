import React, { useState, useEffect } from 'react';
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
import Experience from '../../components/Experience';
import defaultAvatar from '../../assets/default_avatar.jpg';

import './index.scss';

const EditResume = ({
  history,
  user,
  tags,
  addTag,
  createResume,
}, props) => {
  // useEffect(() => {
  //   props.getUserAllProjects({
  //     token: user.token,
  //     m_no: user.m_no,
  //   });
  // });

  const layoutOptions = [
    { text: '作品集', link: '/homePage' },
    { text: '帳戶設定', link: '/settings' },
  ];
  const fakeOptions = ['React', 'Vue', 'Angular', 'jQuery', 'CSS', 'HTML'];
  const educateEntryOptions = ['1900', '1901', '', '', '', ''];
  const educateExistOptions = ['1900', '1901', '', '', '', ''];
  const [experience, setExperience] = useState([{
    expJob: '', expCompany: '', expPlace: '', expDesc: '',
  }]);

  const [isEntryYearOpen, setIsEntryYearOpen] = useState(false);
  const [isExistYearOpen, setIsExistYearOpen] = useState(false);
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

  const handleEditResume = () => {
    const projectTagsData = projectTags.map(t => t.toLowerCase());
    const EditResumeData = {
      token: user.token,
      data: {
        basicIntro: {
          m_no: user.m_no,
          m_introduce: aboutDesc,
          m_school: educateSchool,
          m_degree: educateDegree,
          m_major: educateMajor,
          m_inyear: educateEntryYear,
          m_outyear: educateExistYear,
          m_skill: projectTagsData.toString(),
        },
        experience: [
          {
            m_no: user.m_no,
            m_position: expJob,
            m_company: expCompany,
            m_place: expPlace,
            m_isWorking: false,
            m_workStartyear: expStartYear,
            m_workStartmonth: expStartMonth,
            m_workContent: expDesc,
          },
        ],
      },
    };
    if (JSON.stringify(projectTagsData) !== JSON.stringify(tags)) {
      projectTagsData.map((tag) => {
        if (!tags.includes(tag)) {
          addTag({
            token: user.token,
            tagName: tag,
          });
        }
      });
    }
    createResume(EditResumeData, history);
  };

  const addExpBtn = () => {
    if (experience.length < 3) {
      setExperience([...experience, {
        expJob: '', expCompany: '', expPlace: '', expDesc: '',
      }]);
    }
  };
  const handleTextChange = (e) => {
    for (let i = 0; i < experience.length; i++) {
      experience[i].expJob = e.target.value;
      // experience[i].expCompany = e.target.value;
      // experience[i].expPlace = e.target.value;
      // experience[i].expDesc = e.target.value;
    }

    console.log(experience);
  };
  const deleteExpBtn = (id) => {
    experience.filter(index => id !== index);
  };
  const deleteEditProjectList = () => {

  };


  return (
    <div className="editResume">
      <Layout
        userImg={user.m_avatar || defaultAvatar}
        userName={user.m_name}
        list={layoutOptions}
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
                onClick={addExpBtn}
              />
            </div>
            {
              experience.map((item, index) => (
                <Experience
                  deleteExpBtn={deleteExpBtn(index)}
                  id={index}
                  onChange={handleTextChange}

                // expJobOnChange={e => setExpJob(e.target.value)}
                // expCompanyOnChange={e => setExpCompany(e.target.value)}
                // expPlaceOnChange={e => setExpPlace(e.target.value)}
                // expDescOnChange={e => setExpDesc(e.target.value)}
                />
              ))
            }

          </div>
          <div className="edit_project">
            <h2 className="title">作品</h2>
            {
              //Object.values(props.project).map(
              //item => item && item.mp_no && (
              <EditProjectList
                projectName="123"
                projectDescription="123"
                // projectName={item.mp_name}
                // projectDescription={item.mp_desc}
                isShowCloseIcon
                onClick={deleteEditProjectList}
              />
              //),
              //)}
            }
          </div>
          <div className="edit_button">
            <Button
              className="cancel_btn"
              text="取消"
              type="outline"
              size="small"
              onClick={() => history.push('/homePage')}
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
                // || expJobValidator !== null
                // || expCompanyValidator !== null
                // || expPlaceValidator !== null
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
  project: store.project,
  tags: store.tags,
  resume: store.resume,
});
export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(EditResume),
);
