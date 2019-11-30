import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import action from '../../actions';
import Layout from '../../components/Layout';
import LayoutBtn from '../../components/LayoutBtn';
import UserInfo from '../../components/UserInfo';
import Button from '../../components/Button';
import SearchBar from '../../components/SearchBar';
import Filter from '../../components/Filter';
import ResumeBtn from '../../components/ResumeBtn';
import ProjectList from '../../components/ProjectList';
import Checkbox from '../../components/Checkbox';
import dafaulrAvatar from '../../assets/default_avatar.jpg';

import './index.scss';

const HomePage = (props) => {
  useEffect(() => {
    props.getUserAllProjects({
      token: props.user.token,
      m_no: props.user.m_no,
    });
  }, []);
  const [list, setList] = useState(['作品集', '圖表分析', '帳戶設定']);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [isResumeBtnOpen, setIsResumeBtnOpen] = useState(false);
  const [isProjectDropDownOpen, setIsProjectDropDownOpen] = useState(false);
  const [number, setNumber] = useState(0);

  const handleSelectCheckbox = (choice) => {
    const index = isChecked.indexOf(choice);
    if (index !== -1) {
      setIsChecked(isChecked.filter(item => item !== choice));
    } else {
      setIsChecked([choice, ...isChecked]);
    }
  };

  return (
    <div className="home_page">
      <Layout
        userImg={props.user.m_avatar || dafaulrAvatar}
        userName={props.user.m_name}
        list={list}
      >
        <UserInfo
          userImg={props.user.m_avatar || dafaulrAvatar}
          userName={props.user.m_name}
          userJob={props.user.m_position}
          userAddress="台中市"
          userLink="www.alice0050722.com.tw"
        />
        <LayoutBtn>
          <ResumeBtn
            isOpen={isResumeBtnOpen}
            onClick={() => {
              setIsResumeBtnOpen(true);
            }}
            onClose={() => {
              setIsResumeBtnOpen(false);
            }}
            shouldCloseOnClickOutside
            shouldCloseOnEsc
          >
            <span>編輯履歷</span>
            <span>查看履歷</span>
          </ResumeBtn>
          <Button
            text="新增專案"
            type="primary"
            size="small"
            theme="red"
            className="createNewProjectBtn"
            onClick={() => props.history.push('/create_project')}
          />
        </LayoutBtn>
        <div className="main_section">
          <div className="toolbar">
            <SearchBar placeholder="搜尋專案、標籤、開發者" />
            <Filter
              isOpen={isFilterOpen}
              onClick={() => {
                setIsFilterOpen(true);
              }}
              onClose={() => {
                setIsFilterOpen(false);
              }}
              shouldCloseOnClickOutside
              shouldCloseOnEsc
            >
              <span className="filter_title">隱私</span>
              <hr />
              <Checkbox
                text="私人"
                checked={isChecked.indexOf('私人') !== -1}
                name="private_checkbox"
                onChange={() => {
                  handleSelectCheckbox('私人');
                }}
              />
              <Checkbox
                text="公用"
                checked={isChecked.indexOf('公用') !== -1}
                name="public_checkbox"
                onChange={() => {
                  handleSelectCheckbox('公用');
                }}
              />

              <span className="filter_title">排序</span>
              <hr />
              <Checkbox
                text="新到舊"
                checked={isChecked.indexOf('新到舊') !== -1}
                name="new_checkbox"
                onChange={() => {
                  handleSelectCheckbox('新到舊');
                }}
              />
              <Checkbox
                text="舊到新"
                checked={isChecked.indexOf('舊到新') !== -1}
                name="old_checkbox"
                onChange={() => {
                  handleSelectCheckbox('舊到新');
                }}
              />
            </Filter>
          </div>
          {Object.values(props.project).map(
            item => item.mp_no && (
              <ProjectList
                projectName={item.mp_name}
                projectDescription={item.mp_desc}
                isOpen={isProjectDropDownOpen}
                onClick={() => {
                  setIsProjectDropDownOpen(true);
                }}
                onClose={() => {
                  setIsProjectDropDownOpen(false);
                }}
                shouldCloseOnClickOutside
                shouldCloseOnEsc
                number={number}
                onDoubleClick={() => {
                  setNumber(number + 1);
                }}
              >
                <span
                  onClick={() => {
                    props.history.push(`/portfolio/${item.mp_no}`);
                  }}
                >
                    查看作品集
                </span>
                <span>編輯程式碼</span>
                <span>分享</span>
                <span>設定</span>
                <span style={{ color: '#ec5252' }}>刪除</span>
              </ProjectList>
            ),
          )}
        </div>
      </Layout>
    </div>
  );
};

const mapStateToProps = store => ({
  user: store.user,
  project: store.project,
});

export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(HomePage),
);
