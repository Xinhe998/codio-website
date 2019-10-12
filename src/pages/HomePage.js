import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isRequired } from 'calidators';

import action from '../actions';
import Layout from '../components/Layout';
import UserInfo from '../components/UserInfo';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import ResumeBtn from '../components/ResumeBtn';
import ProjectList from '../components/ProjectList';
import Checkbox from '../components/Checkbox';
import userImg from '../assets/userImg.png';

import './HomePage.scss';


const HomePage = (props) => {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');

  const [userName, setUserName] = useState('Alice');
  const [list, setList] = useState(['作品集', '圖表分析', '帳戶設定']);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isResumeBtnOpen, setIsResumeBtnOpen] = useState(false);
  const [isProjectDropDownOpen, setIsProjectDropDownOpen] = useState(false);
  const loginHandler = () => {
    const loginData = {
      id,
      password,
    };
    props.login(loginData, props.history);
  };


  return (
    <div className="home_page">
      <Layout
        userImg={userImg}
        userName={userName}
        list={list}
      >
        <UserInfo
          userImg={userImg}
          userName="Alice"
          userJob="前端工程師"
          userAddress="台中市"
          userLink="www.alice0050722.com.tw"
        />
        <Button
          className="add_project_btn"
          text="新增"
          type="primary"
          size="small"
          theme="red"
          onClick={() => history.push('/create_project')}
        />
        <div className="main_section">

          <div className="tool">
            <SearchBar
              placeholder="搜尋專案、標籤、開發者"
            />
            <Filter
              isOpen={isFilterOpen}
              onClick={() => { setIsFilterOpen(true); }}
              onClose={() => { setIsFilterOpen(false); }}
              shouldCloseOnClickOutside
              shouldCloseOnEsc
            >
              <span className="filter_title">隱私</span>
              <hr />
              <Checkbox
                text="私人"
                // checked={isChecked}
                name="member_checkbox"
              // onChange={setIsChecked}
              />
              <Checkbox
                text="公用"
                // checked={isChecked}
                name="member_checkbox"
              // onChange={setIsChecked}
              />

              <span className="filter_title">排序</span>
              <hr />
              <Checkbox
                text="新到舊"
                // checked={isChecked}
                name="member_checkbox"
              // onChange={setIsChecked}
              />
              <Checkbox
                text="舊到新"
                // checked={isChecked}
                name="member_checkbox"
              // onChange={setIsChecked}
              />
            </Filter>
            <ResumeBtn
              isOpen={isResumeBtnOpen}
              onClick={() => { setIsResumeBtnOpen(true); }}
              onClose={() => { setIsResumeBtnOpen(false); }}
              shouldCloseOnClickOutside
              shouldCloseOnEsc
            >
              <span>製作履歷</span>
              <span>編輯履歷</span>
              <span>查看履歷</span>
            </ResumeBtn>
          </div>
          <ProjectList
            projectName="專題"
            projectDescription="loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem"
            isOpen={isProjectDropDownOpen}
            onClick={() => { setIsProjectDropDownOpen(true); }}
            onClose={() => { setIsProjectDropDownOpen(false); }}
            shouldCloseOnClickOutside
            shouldCloseOnEsc
            // onDoubleClick={}
          >
            <span>編輯描述</span>
            <span>編輯程式碼</span>
            <span>分享</span>
            <span>設定</span>
            <span style={{ color: '#ec5252' }}>刪除</span>
            <div>123</div>
          </ProjectList>
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
  )(HomePage),
);
