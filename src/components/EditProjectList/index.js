import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosCloseCircle } from 'react-icons/io';
import action from '../../actions';
import Label from '../Label';
import './index.scss';

const text = ['標籤'];
const EditProjectList = ({
  projectName,
  onClick,
  projectDescription,
  isShowCloseIcon,
}) => (
  <div className="edit_project_list">
    <div className="edit_project_title">
      <h3>{projectName}</h3>
    </div>
    <Label
      className="label"
      labels={text}
    />
    <p className="edit_project_description">{projectDescription}</p>
    {isShowCloseIcon
      ? (
        <div className="close_icon">
          <IoIosCloseCircle
            onClick={onClick}
            color="#ec5252"
            size="30px"
          />
        </div>
      ) : null
    }
  </div>

);

EditProjectList.propTypes = {
  projectName: PropTypes.string,
  onClick: PropTypes.func,
  projectDescription: PropTypes.string,
  isShowCloseIcon: PropTypes.bool,
};

EditProjectList.defaultProps = {
  projectName: '',
  projectDescription: '',
  isShowCloseIcon: false,
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
