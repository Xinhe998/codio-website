import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isRequired } from 'calidators';

import Index from '../Index/index';
import TextInput from '../../components/TextInput';
import TextArea from '../../components/TextArea';
import Modal from '../../components/Modal';
import MultiSelect from '../../components/MultiSelect';
import RadioButtonGroup from '../../components/RadioButtonGroup';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';

import action from '../../actions';
import '../Index/index.scss';
import './index.scss';
import boostrapImg from '../../assets/bootstrap.svg';
import htmlImg from '../../assets/html.svg';

const CreateProject = ({
  history,
  user,
  tags,
  createProject,
  getAllTags,
  addTag,
}) => {
  useEffect(() => {
    getAllTags({
      token: user.token,
    });
  }, []);

  const privacyOptions = ['公開', '私人'];
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectTemplate, setProjectTemplate] = useState(['']);
  const [projectPrivacy, setProjectPrivacy] = useState('公開');
  const [projectTags, setProjectTags] = useState([]);
  const projectTitleValidator = isRequired({ message: '請輸入專案標題' })(
    projectTitle,
  );

  const handleSelectProjectTemplate = (template) => {
    const index = projectTemplate.indexOf(template);
    if (index !== -1) {
      setProjectTemplate(projectTemplate.filter((item) => item !== template));
    } else {
      setProjectTemplate([template, ...projectTemplate]);
    }
  };
  const createProjectHandler = () => {
    const projectTagsData = projectTags.map((t) => t.toLowerCase());
    const projectData = {
      m_no: user.m_no,
      token: user.token,
      title: projectTitle,
      desc: projectDesc,
      privacy: projectPrivacy === '公開',
      tags: projectTagsData.toString(),
      snippets: projectTemplate,
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
    createProject(projectData, history);
  };
  return (
    <div className="CreateProject">
      <Index needAuth={false} />
      <Modal
        isOpen
        shouldCloseOnEsc={false}
        shouldCloseOnClickOutside={false}
        showControlBtn={false}
        title="新增專案"
        onClose={() => history.goBack()}
        className="CreateProjectModal"
      >
        <div className="createProjectForm">
          <div className="createProjectForm__information">
            <p className="createProjectForm__information__title">專案資訊</p>
            <TextInput
              title="標題"
              type="text"
              text={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              required
            />
            <MultiSelect
              title="類別"
              options={tags}
              selectedItems={projectTags}
              onChange={setProjectTags}
            />
            <TextArea
              title="描述"
              text={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
              maxHeight={80}
            />
            <RadioButtonGroup
              title="隱私"
              name="privacy"
              options={privacyOptions}
              value={projectPrivacy}
              onChange={setProjectPrivacy}
              required
            />
          </div>
          <div className="createProjectForm__template">
            <p className="createProjectForm__template__title">選擇模板</p>
            <div className="createProjectForm__template__option">
              <Checkbox
                name="templateCheckbox"
                checked={projectTemplate.indexOf('Bootstrap') !== -1}
                onChange={() => handleSelectProjectTemplate('Bootstrap')}
              />
              <span className="optionText">
                <img src={boostrapImg} alt="bootstrap_icon" />
                <div className="iconBackground bootstrap" />
                Bootstrap
              </span>
            </div>
            <div className="createProjectForm__template__option">
              <Checkbox
                name="templateCheckbox"
                checked={projectTemplate.indexOf('HTML5') !== -1}
                onChange={() => handleSelectProjectTemplate('HTML5')}
              />
              <span className="optionText">
                <img src={htmlImg} alt="html_icon" />
                <div className="iconBackground html" />
                HTML5
              </span>
            </div>
            <div className="createProjectForm__template__button-group">
              <Button
                className="cancel_btn"
                text="取消"
                type="outline"
                size="small"
                onClick={() => history.goBack()}
              />
              <Button
                className="createProject_btn"
                text="新增"
                type="primary"
                size="small"
                onClick={createProjectHandler}
                disabled={projectTitleValidator !== null}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (store) => ({
  editor: store.editor,
  user: store.user,
  project: store.project,
  tags: store.tags,
});

export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(CreateProject),
);
