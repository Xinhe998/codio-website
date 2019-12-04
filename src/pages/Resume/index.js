import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import action from '../../actions';

import Layout from '../../components/Layout';
import LayoutBtn from '../../components/LayoutBtn';
import EditProjectList from '../../components/EditProjectList';
import Label from '../../components/Label';
import './index.scss';
import defaultAvatar from '../../assets/default_avatar.jpg';

import { PDFDownloadLink } from '@react-pdf/renderer';
import ExportResume from '../ExportResume';

const Resume = (props) => {
  const layoutOptions = [
    { text: '作品集', link: '/homePage' },
    { text: '帳戶設定', link: '/settings' },
  ];

  const [userCounty, setUserCounty] = useState(props.user.m_address_title);
  const [userJob, setUserJob] = useState(props.user.m_position);
  const [userUrl, setUserUrl] = useState(props.user.m_website);
  const [userSchool, setUserSchool] = useState('國立臺中科技大學');
  const [userMajor, setUserMajor] = useState('資訊應用');
  const [userGraduateYear, setUserGraduateYear] = useState('畢業於2020年');
  const [userBg, setUserBg] = useState(
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy eirmod tempor invidunt ut labore et dolore magnaaliquyam erat, sed diam voluptua. At vero eos et accusam et justduo dolores et ea rebum.',
  );
  // const [skill, setSkill] = useState('HTMLHTML');
  const text = ['標籤'];
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
  const [projectName, setProjectName] = useState('公開專題');
  const [projectDescription, setProjectDescription] = useState(
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy eirmod tempor invidunt ut labore et dolore magnaaliquyam erat, sed diam voluptua. At vero eos et accusam et justduo dolores et ea rebum.',
  );

  const createPdf = html => Doc.createPdf(html);
  const bodyRef = React.useRef();

  return (
    <div className="resume">
      <Layout
        userImg={props.user.m_avatar || defaultAvatar}
        userName={props.user.m_name}
        list={layoutOptions}
      >
        <LayoutBtn>
          <PDFDownloadLink
            className="download_resume_btn"
            document={<ExportResume />}
            fileName={`${props.user.m_name}-resume.pdf`}
          >
            {({
              blob, url, loading, error,
            }) => (loading ? '載入PDF履歷中...' : '下載PDF履歷')
            }
          </PDFDownloadLink>
        </LayoutBtn>
        <div className="main_section" ref={bodyRef}>
          <div className="user_info">
            <div className="left_sec">
              <img src={props.user.m_avatar || defaultAvatar} alt="個人照" className="avatar_dropzone" />
              <h3>{userCounty}</h3>
              <h3>{userJob}</h3>
              <h3>{userUrl}</h3>
            </div>
            <div className="right_sec">
              <h1>{props.user.m_name}</h1>
              <h3>{`${userSchool} ${userMajor}`}</h3>
              <h3>{userGraduateYear}</h3>
              <p>{userBg}</p>
            </div>
          </div>
          <div className="skills">
            <h2 className="title">技術</h2>
            <Label
              className="label"
              labels={text}
            />
          </div>
          <div className="user_exp">
            <h2 className="title">經歷</h2>
            <div className="exp_block">
              <span className="line" />
              <div className="exp_block_wrapper">
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
            </div>
          </div>
          <div className="user_project">
            <h2 className="title">作品</h2>
            {Object.values(props.project).map(
              item => item.mp_no && (
                <div className="project_block">

                  <EditProjectList
                    projectName={item.mp_name}
                    projectDescription={item.mp_desc}
                  />

                </div>
              ),
            )}
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

export default withRouter(connect(mapStateToProps, action)(Resume));
