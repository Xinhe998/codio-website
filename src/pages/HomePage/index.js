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
import Modal from '../../components/Modal';
import TextInput from '../../components/TextInput';
import RadioButtonGroup from '../../components/RadioButtonGroup';

import './index.scss';

const HomePage = (props) => {
  useEffect(() => {
    props.getUserAllProjects(
      {
        token: props.user.token,
        m_no: props.user.m_no,
      },
      props.history,
    );
  }, []);

  const layoutOptions = [
    { text: '作品集', link: '/homePage' },
    { text: '帳戶設定', link: '/settings' },
  ];
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [isResumeBtnOpen, setIsResumeBtnOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isProjectDropDownOpen, setIsProjectDropDownOpen] = useState(false);
  const [number, setNumber] = useState(0);
  const [permission, setPermission] = useState('編輯');
  const permissionOptions = ['編輯', '檢視'];
  const [currentDeleteId, setCurrentDeleteId] = useState('');

  const handleSelectCheckbox = (choice) => {
    const index = isChecked.indexOf(choice);
    if (index !== -1) {
      setIsChecked(isChecked.filter(item => item !== choice));
    } else {
      setIsChecked([choice, ...isChecked]);
    }
  };

  const deleteProjectHandler = () => {
    const deleteProjectData = {
      token: props.user.token,
      mp_no: currentDeleteId,
    };
    props.deleteProject(deleteProjectData, props.history);
    setCurrentDeleteId('');
    setIsDeleteModalOpen(false);
  };
  const ShareUrlInputRef = React.createRef();

  return (
    <div className="home_page">
      <Layout
        userImg={props.user.m_avatar || dafaulrAvatar}
        userName={props.user.m_name}
        list={layoutOptions}
      >
        <UserInfo
          userImg={props.user.m_avatar || dafaulrAvatar}
          userName={props.user.m_name}
          userJob={props.user.m_position}
          userAddress={props.user.m_address_title}
          userLink={props.user.m_website}
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
            <span onClick={() => props.history.push('/resume/edit')}>編輯履歷</span>
            <span onClick={() => props.history.push('/resume')}>查看履歷</span>
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
            (item) =>
              item && item.mp_no && (
                <ProjectList
                  projectName={item.mp_name}
                  projectDescription={item.mp_desc}
                  isOpen={isProjectDropDownOpen}
                  onClick={() => {
                    props.history.push(`/portfolio/${item.mp_no}`);
                  }}
                >
                  <span>
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
        <Modal
          isOpen={isShareModalOpen}
          className="shareModal"
          title="與他人共用"
          onClose={() => setIsShareModalOpen(false)}
          shouldCloseOnEsc
          shouldCloseOnClickOutside
          showControlBtn
          confirmBtnText="儲存"
          cancelBtnText="取消"
        >
          <TextInput
            text="http://www.qwertyuiopzjqwmdhsuabxsjx.."
            showPostBtn
            postBtnText="複製連結"
            ref={ShareUrlInputRef}
            postBtnOnClick={() => {
              ShareUrlInputRef.current.select();
              document.execCommand('copy');
            }}
            readonly
          />
          <p>知道連結的人可以</p>
          <RadioButtonGroup
            name="permission"
            options={permissionOptions}
            value={permission}
          // onChange={()=> {}}
          />
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          title="確定刪除專案"
          onClose={() => {
            isDeleteModalOpen(false);
            setCurrentDeleteId('');
          }}
          shouldCloseOnEsc
          shouldCloseOnClickOutside
          showControlBtn
          cancelBtnText="取消"
          confirmBtnText="確定"
          Confirm={deleteProjectHandler}

        />
      </Layout>
    </div>
  );
};

const mapStateToProps = store => ({
  user: store.user,
  project: store.project,
});

export default withRouter(connect(mapStateToProps, action)(HomePage));
