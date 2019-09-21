import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Index from './index';
import TextInput from '../components/TextInput';
import TextArea from '../components/TextArea';
import Modal from '../components/Modal';
import MultiSelect from '../components/MultiSelect';
import RadioButtonGroup from '../components/RadioButtonGroup';

import * as action from '../actions';
import './index.scss';
import './CreateProject.scss';

const CreateProject = ({ history }) => {
  const fakeOptions = ['React', 'Vue', 'Angular', 'jQuery', 'CSS', 'HTML'];
  const privacyOptions = ['公開', '私人'];
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  return (
    <div className="CreateProject">
      <Index />
      <Modal
        isOpen
        shouldCloseOnEsc={false}
        shouldCloseOnClickOutside={false}
        showControlBtn={false}
        title="新增專案"
        onClose={() => history.push('/')}
      >
        <div className="createProjectForm">
          <div className="createProjectForm__information">
            <p className="createProjectForm__information__title">專案資訊</p>
            <TextInput
              title="標題"
              type="text"
              text={projectTitle}
              onChange={e => setProjectTitle(e.target.value)}
              required
            />
            <MultiSelect title="類別" options={fakeOptions} />
            <TextArea
              title="描述"
              text={projectDesc}
              onChange={e => setProjectDesc(e.target.value)}
            />
            <RadioButtonGroup
              title="隱私"
              name="privacy"
              options={privacyOptions}
              required
            />
          </div>
          <div className="createProjectForm__template">
            <p className="createProjectForm__template__title">選擇模板</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = store => ({
  editor: store.editor,
  user: store.user,
});
export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(CreateProject),
);
