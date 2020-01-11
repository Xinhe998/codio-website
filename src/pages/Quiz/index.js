import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import action from '../../actions';

import Layout from '../../components/Layout';
import LayoutBtn from '../../components/LayoutBtn';
import Button from '../../components/Button';
import List from '../../components/List';
import Modal from '../../components/Modal';
import MultiSelect from '../../components/MultiSelect';
import TextArea from '../../components/TextArea';
import TextInput from '../../components/TextInput';

import './index.scss';

const Quiz = (props) => {
  const [isCreateQuizModalOpen, setIsCreateQuizModalOpen] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDesc, setQuizDesc] = useState('');
  const [quizTargetUser, setQuizTargetUser] = useState([]);
  const layoutOptions = [
    { text: '作品集', link: '/homepage' },
    { text: '帳號管理', link: '/settings' },
    { text: '測驗管理', link: '/quiz' },
  ];
  const quiz = [
    {
      title: 'test1',
      desc: 'test1test1',
      action: (
        <React.Fragment>
          <Button
            className="edit_btn"
            text="編輯"
            type="outline"
            size="small"
            theme="blue"
            // onClick={deleteExpBtn}
          />
          <Button
            className="delete_btn"
            text="刪除"
            type="outline"
            size="small"
            theme="red"
            // onClick={deleteExpBtn}
          />
        </React.Fragment>
      ),
    },
    {
      title: 'test2',
      desc: 'test2test2',
      action: (
        <React.Fragment>
          <Button
            className="edit_btn"
            text="編輯"
            type="outline"
            size="small"
            theme="blue"
            // onClick={deleteExpBtn}
          />
          <Button
            className="delete_btn"
            text="刪除"
            type="outline"
            size="small"
            theme="red"
            // onClick={deleteExpBtn}
          />
        </React.Fragment>
      ),
    },
  ];
  const stus = ['Xinhe', 'Yinmin', 'Daniel', 'Andy'];
  return (
    <div className="Quiz">
      <Layout
        userImg={props.user.m_avatar || defaultAvatar}
        userName={props.user.m_name}
        list={layoutOptions}
      >
        <LayoutBtn>
          <Button
            text="新增測驗"
            type="primary"
            size="small"
            theme="red"
            className="create_quiz_btn"
            onClick={() => setIsCreateQuizModalOpen(true)}
          />
        </LayoutBtn>
        <div className="main_section">
          <h2 className="title">測驗</h2>
          <List items={quiz} />
        </div>
      </Layout>
      <Modal
        isOpen={isCreateQuizModalOpen}
        shouldCloseOnEsc
        shouldCloseOnClickOutside={false}
        showControlBtn
        title="新增測驗"
        onClose={() => setIsCreateQuizModalOpen(false)}
        className="CreateQuizModal"
      >
        <div className="createQuizForm">
          <div className="createQuizForm__information">
            <TextInput
              title="標題"
              type="text"
              text={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              required
            />
            <TextArea
              title="描述"
              text={quizDesc}
              onChange={(e) => setQuizDesc(e.target.value)}
              maxHeight={80}
              required
            />
            <MultiSelect
              title="參與測驗者"
              options={stus}
              selectedItems={quizTargetUser}
              onChange={setQuizTargetUser}
              allowCreate={false}
              required
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (store) => ({
  user: store.user,
  settings: store.settings,
});
export default withRouter(connect(mapStateToProps, action)(Quiz));
