import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosCloseCircle } from 'react-icons/io';
import action from '../../actions';
import Label from '../Label';
import './index.scss';

const EditProjectList = ({
  projectName,
  onClick,
  projectDescription,
}) => (
  <div className="edit_project_list">
    <div className="edit_project_title">
      <h3>{projectName}</h3>
    </div>
    <Label
      className="label dark"
      text="標籤"

    />
    <p className="edit_project_description">{projectDescription}</p>
    <div className="close_icon">
      <IoIosCloseCircle
        onClick={onClick}
        color="#ec5252"
        size="30px"
      />
    </div>
  </div>

);

EditProjectList.propTypes = {
  projectName: PropTypes.string,
  onClick: PropTypes.func,
  projectDescription: PropTypes.string,
};

EditProjectList.defaultProps = {
  projectName: '',
  projectDescription: '',
};

const mapStateToProps = store => ({
  user: store.user,
  editor: store.editor,
});
export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(EditProjectList),
);
