import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import action from '../../actions';

import Layout from '../../components/Layout';
import LayoutBtn from '../../components/LayoutBtn';
import Button from '../../components/Button';
import EditProjectList from '../../components/EditProjectList';

import './index.scss';
import userImg from '../../assets/userImg.png';

import { PDFDownloadLink } from '@react-pdf/renderer';
import ExportResume from '../ExportResume';

const Resume = (props) => {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');

  const [userName, setUserName] = useState('Alice');
  const [list, setList] = useState(['會員管理']);

  const [charName, setCharName] = useState('');
  const [userCounty, setUserCounty] = useState('台中市');
  const [userJob, setUserJob] = useState('前端工程師');
  const [userUrl, setUserUrl] = useState('www.alice0050722.com.tw');
  const [userSchool, setUserSchool] = useState('國立臺中科技大學');
  const [userMajor, setUserMajor] = useState('資訊應用');
  const [userGraduateYear, setUserGraduateYear] = useState('畢業於2020年');
  const [userBg, setUserBg] = useState(
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy eirmod tempor invidunt ut labore et dolore magnaaliquyam erat, sed diam voluptua. At vero eos et accusam et justduo dolores et ea rebum.',
  );
  const [skill, setSkill] = useState('HTMLHTML');
  const [expJob, setExpJob] = useState('網頁前端開發');
  const [expChar, setExpChar] = useState('實習生');
  const [expCompany, setExpCompany] = useState('研華科技');
  const [expPlace, setExpPlace] = useState('台北市');
  const [expStartYear, setExpStartYear] = useState('2018');
  const [expStartMonth, setExpStartMonth] = useState('12');
  const [expExistYear, setExpExistYear] = useState('2018');
  const [expExistMonth, setExpExistMonth] = useState('12');
  const [expTotal, setExpTotal] = useState('7個月');
  const [expDetail, setExpDetail] = useState(
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy eirmod tempor invidunt ut labore et dolore magnaaliquyam erat, sed diam.',
  );
  const [projectStartYear, setProjectStartYear] = useState('2018');
  const [projectStartMonth, setProjectStartMonth] = useState('12');
  const [projectExistYear, setProjectExistYear] = useState('2018');
  const [projectExistMonth, setProjectExistMonth] = useState('12');
  const [projectName, setProjectName] = useState('公開專題');
  const [projectDescription, setProjectDescription] = useState(
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy eirmod tempor invidunt ut labore et dolore magnaaliquyam erat, sed diam voluptua. At vero eos et accusam et justduo dolores et ea rebum.',
  );

  const createPdf = (html) => Doc.createPdf(html);
  const bodyRef = React.useRef();

  const loginHandler = () => {
    const loginData = {
      id,
      password,
    };
    props.login(loginData, props.history);
  };

  return (
    <div className="resume">
      <Layout userImg={userImg} userName={userName} list={list}>
        <LayoutBtn>
          <PDFDownloadLink
            className="download_resume_btn"
            document={<ExportResume />}
            fileName={`${props.user.m_name}-resume.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? '載入PDF履歷中...' : '下載PDF履歷'
            }
          </PDFDownloadLink>
        </LayoutBtn>
        <div className="main_section" ref={bodyRef}>
          <div className="user_info">
            <div className="left_sec">
              <img src={userImg} alt="個人照" />
              <h3>{userCounty}</h3>
              <h3>{userJob}</h3>
              <h3>{userUrl}</h3>
            </div>
            <div className="right_sec">
              <h1>{userName}</h1>
              <h3>{`${userSchool} ${userMajor}`}</h3>
              <h3>{userGraduateYear}</h3>
              <p>{userBg}</p>
              <div className="skills">
                <div className="skills_block">
                  <span>1</span>
                  <h4>{skill}</h4>
                </div>
                <div className="skills_block">
                  <span>1</span>
                  <h4>CSS</h4>
                </div>
                <div className="skills_block">
                  <span>1</span>
                  <h4>HTML&CSS</h4>
                </div>
                <div className="skills_block">
                  <span>1</span>
                  <h4>HTML&CSS</h4>
                </div>
                <div className="skills_block">
                  <span>1</span>
                  <h4>HTML&CSS</h4>
                </div>
                <div className="skills_block">
                  <span>1</span>
                  <h4>HTML&CSS</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="user_exp">
            <h2 className="title">經歷</h2>
            <div className="exp_block">
              <span>1</span>
              <h4>{`${expJob} ${expChar}`}</h4>
              <h5>{`${expCompany} ${expPlace}`}</h5>
              <h5>
                {`${expStartYear}  ${expStartMonth}～${expExistYear} ${expExistMonth} 共${expTotal}`}
              </h5>
              <p>
                <h5>工作內容：</h5>
                {expDetail}
              </p>
            </div>
            <div className="exp_block">
              <span>1</span>
              <h4>網頁前端開發 實習生</h4>
              <h5>研華科技 台北市</h5>
              <h5>
                2018年1月～2018年7月
                <span>7個月</span>
              </h5>
              <p>
                <h5>工作內容：</h5>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed.
              </p>
            </div>
            <div className="exp_block">
              <span>1</span>
              <h4>網頁前端開發 實習生</h4>
              <h5>研華科技 台北市</h5>
              <h5>
                2018年1月～2018年7月
                <span>7個月</span>
              </h5>
              <p>
                <h5>工作內容：</h5>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed.
              </p>
            </div>
          </div>
          <div className="user_project">
            <h2 className="title">作品</h2>
            <div className="project_block">
              <div className="project_time">
                <h4>{`${projectStartYear}  ${projectStartMonth}`}</h4>
                <h4>{`${projectExistYear}  ${projectExistMonth}`}</h4>
              </div>
              <EditProjectList
                projectName={projectName}
                projectDescription={projectDescription}
              />
            </div>
            <div className="project_block">
              <div className="project_time">
                <h4>2019 12月</h4>
                <h4>2019 12月</h4>
              </div>
              <EditProjectList
                projectName={projectName}
                projectDescription={projectDescription}
              />
            </div>
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

export default withRouter(connect(mapStateToProps, action)(Resume));
