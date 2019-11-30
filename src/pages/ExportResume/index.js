import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  PDFViewer,
  Font,
} from '@react-pdf/renderer';
import action from '../../actions';

import defaultAvatar from '../../assets/default_avatar.jpg';
import TaipeiFont from '../../assets/TaipeiSansTCBeta-Regular.ttf';
import TaipeiFontBold from '../../assets/TaipeiSansTCBeta-Bold.ttf';
// import EditProjectList from '../../components/EditProjectList';
Font.register({
  family: 'Taipei Sans TC Regular',
  src: TaipeiFont,
});
Font.register({
  family: 'Taipei Sans TC Bold',
  src: TaipeiFontBold,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    fontFamily: 'Taipei Sans TC Regular',
    padding: '30px 40px',
  },
  section1: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
  },
  section2: {
    display: 'flex',
    flexDirection: 'cloumn',
    marginBottom: '20px',
  },
  section1_left: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left',
    fontSize: 9,
    lineHeight: 1.5,
    width: '30%',
  },
  section2_left: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  username: {
    fontSize: 18,
    fontFamily: 'Taipei Sans TC Bold',
    lineHeight: 2,
  },
  smalltext: {
    fontSize: 8,
    color: '#707070',
    lineHeight: 1.5,
  },
  desc: {
    marginTop: '8px',
    fontSize: 10,
    lineHeight: 1.2,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.5,
  },
  avatarWrapper: {
    width: '100px',
    height: '100px',
    outline: '0',
    marginBottom: '10px',
    borderRadius: '20px',
    position: 'relative',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 10,
  },
  tag: {
    color: '#3597ec',
    fontSize: 8,
    borderRadius: 3,
    padding: '5px 10px',
    backgroundColor: '#e8f0fb',
    marginRight: 5,
    marginTop: 5,
    marginBottom: 3,
  },
  skillWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  experiencesWrapper: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  experience: {
    fontSize: 10,
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    flexBasis: 'auto',
    flexWrap: 'wrap',
    lineHeight: 1.5,
    flex: 1,
    marginBottom: '10px',
  },
  job_title: {
    fontSize: 12,
    fontFamily: 'Taipei Sans TC Bold',
  },
  job_company: {
    fontFamily: 'Taipei Sans TC Bold',
    lineHeight: 1.5,
  },
  job_time: {
    color: '#707070',
  },
  job_desc: {
    marginTop: '15px',
    lineHeight: 1.5,
    paddingLeft: '15px',
  },
  borderleftBlue: {
    borderLeft: '5pt solid #3597ec',
    paddingLeft: '10px',
  },
  portfolio: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 25px',
    border: '1pt solid #e4e4e4',
    borderRadius: 3,
    marginBottom: '10px',
  },
  portfolio_title: {
    fontSize: 13,
  },
  portfolio_tags: {
    display: 'flex',
    flexDirection: 'row',
  },
  portfolio_desc: {
    fontSize: 10,
    color: '#707070',
    marginTop: '5px',
  },
  viewer: {
    width: '100%',
    height: '100vh',
    border: 'none',
  },
});

const ExportResume = () => {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');

  const [userName, setUserName] = useState('Xinhe');
  const [list, setList] = useState(['會員管理']);

  const [charName, setCharName] = useState('');
  const [userCounty, setUserCounty] = useState('台中市');
  const [userJob, setUserJob] = useState('前端工程師');
  const [userUrl, setUserUrl] = useState('xinhe998@gmail.com');
  const [userSchool, setUserSchool] = useState('國立臺中科技大學');
  const [userMajor, setUserMajor] = useState('資訊應用');
  const [userGraduateYear, setUserGraduateYear] = useState('畢業於2020年');
  const [userBg, setUserBg] = useState(
    "Hi, I am Xinhe. Currently majoring in Information Application at college, I'm focusing on web Front-End development.With solid web development skills, I processed experience as an intern in three companies.",
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
  const [expTotal, setExpTotal] = useState('7');
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section1}>
          <View style={styles.section1_left}>
            <View style={styles.avatarWrapper}>
              <Image
                source="https://avatars3.githubusercontent.com/u/29070256?s=460&v=4"
                style={styles.avatarImg}
              />
            </View>
            <Text>{expPlace}</Text>
            <Text>{userJob}</Text>
            <Text>{userUrl}</Text>
          </View>
          <View style={styles.section2_left}>
            <Text style={styles.username}>{userName}</Text>
            <Text style={styles.smalltext}>{`${userSchool} ${userMajor}`}</Text>
            <Text style={styles.smalltext}>{userGraduateYear}</Text>
            <Text style={styles.desc}>{userBg}</Text>
          </View>
        </View>
        <View style={styles.section2}>
          <Text style={styles.title}>技術</Text>
          <View style={styles.skillWrapper}>
            <Text style={styles.tag}>HTML</Text>
            <Text style={styles.tag}>CSS</Text>
            <Text style={styles.tag}>JavaScript</Text>
            <Text style={styles.tag}>React.js</Text>
            <Text style={styles.tag}>Redux</Text>
            <Text style={styles.tag}>Microsoft SQL Server</Text>
          </View>
        </View>
        <View style={styles.section2} wrap>
          <Text style={styles.title}>經歷</Text>
          <View style={styles.experiencesWrapper}>
            <View style={styles.experience}>
              <View style={styles.borderleftBlue}>
                <Text style={styles.job_title}>網頁前端開發實習生</Text>
                <Text style={styles.job_company}>Yahoo!</Text>
                <Text
                  style={styles.job_time}
                >{`${expStartYear}年 ${expStartMonth}月 - ${expExistYear}年 ${expExistMonth}月  · ${expTotal}個月`}</Text>
                <Text style={styles.job_time}>台北市</Text>
              </View>
              <Text style={styles.job_desc}>
                As a Front-End Engineering intern, I was responsible for
                participating Yahoo Youcard project growth. {'\n'}
                {'\n'}1. Built a Progressive Web Application (PWA), implemented
                cache strategy and enabled offline reading, that contributed to
                35% faster in speed of page loading.
                {'\n'}2. Improved SEO by adding the structured data, resulted in
                double website traffic.
                {'\n'}3. Optimized performance by lazy load, reducing bundle
                sizes and generating animations using pure CSS.
              </Text>
            </View>
            <View style={styles.experience}>
              <View style={styles.borderleftBlue}>
                <Text style={styles.job_title}>網頁前端開發實習生</Text>
                <Text style={styles.job_company}>研華科技</Text>
                <Text
                  style={styles.job_time}
                >{`${expStartYear}年 ${expStartMonth}月 - ${expExistYear}年 ${expExistMonth}月  · ${expTotal}個月`}</Text>
                <Text style={styles.job_time}>台北市</Text>
              </View>
              <Text style={styles.job_desc}>
                1. Responsible for developing and maintaining Marketplace
                project with ASP.NET MVC.
                {'\n'}2. Successfully implemented coded UI test with 50 test
                cases using Selenium and completed CI process in a week. The
                result was reducing 10% of human resource capital expenditure.
                {'\n'}3. Hosted a transnational conference to shared the
                experience on coded UI test with IT colleagues and QA colleagues
                working in Kunshan, China.
                {'\n'}4. Partnered with a manager, PM, UI/UX designers and
                software engineers to develop Marketplace and other website
                projects.
              </Text>
            </View>
            <View style={styles.experience}>
              <View style={styles.borderleftBlue}>
                <Text style={styles.job_title}>Project Engineer</Text>
                <Text style={styles.job_company}>創科資訊股份有限公司</Text>
                <Text
                  style={styles.job_time}
                >{`${expStartYear}年 ${expStartMonth}月 - ${expExistYear}年 ${expExistMonth}月  · ${expTotal}個月`}</Text>
                <Text style={styles.job_time}>台北市</Text>
              </View>
              <Text style={styles.job_desc}>
                1. Participation of ‘VIPT JOB’ official website(job bank
                platform for migrant workers and enterprise) development with
                Vue.js and EJS.
                {'\n'}2. Participation of ‘Kbro HealthCare’ mobile app
                development with React Native.
                {'\n'}3. Familiar with Git, JavaScript, React, EJS.
                {'\n'}4. Familiar with working in Scrum.
              </Text>
            </View>
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section2} wrap>
          <Text style={styles.title}>作品</Text>
          <View>
            <View style={styles.portfolio}>
              <Text style={styles.portfolio_title}>我的第一個專案</Text>
              <View style={styles.portfolio_tags}>
                <Text style={styles.tag}>HTML</Text>
                <Text style={styles.tag}>CSS</Text>
                <Text style={styles.tag}>JavaScript</Text>
              </View>
              <Text style={styles.portfolio_desc}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut
              </Text>
            </View>
            <View style={styles.portfolio}>
              <Text style={styles.portfolio_title}>我的第一個專案</Text>
              <View style={styles.portfolio_tags}>
                <Text style={styles.tag}>HTML</Text>
                <Text style={styles.tag}>CSS</Text>
                <Text style={styles.tag}>JavaScript</Text>
              </View>
              <Text style={styles.portfolio_desc}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut
              </Text>
            </View>
            <View style={styles.portfolio}>
              <Text style={styles.portfolio_title}>我的第一個專案</Text>
              <View style={styles.portfolio_tags}>
                <Text style={styles.tag}>HTML</Text>
                <Text style={styles.tag}>CSS</Text>
                <Text style={styles.tag}>JavaScript</Text>
              </View>
              <Text style={styles.portfolio_desc}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const mapStateToProps = (store) => ({
  user: store.user,
  editor: store.editor,
});

// export default withRouter(connect(mapStateToProps, action)(ExportResume));

export default ExportResume;
