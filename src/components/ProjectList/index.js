import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaEllipsisH, FaHeart } from 'react-icons/fa';
import action from '../../actions';
import useClickOutside from '../../hooks/useClickOutside';
import useEscCloseModal from '../../hooks/useEscCloseModal';
import Label from '../Label';
import './index.scss';

const text = ['標籤'];

const ProjectList = ({
  shouldCloseOnEsc,
  projectName,
  projectDescription,
  onDoubleClick,
  children,
  number,
  onClick,
}) => {
  const dropDownRef = useRef();
  const [isProjectDropDownOpen, setIsProjectDropDownOpen] = useState(false);
  useClickOutside(isProjectDropDownOpen, dropDownRef, () => setIsProjectDropDownOpen(false));
  if (shouldCloseOnEsc) useEscCloseModal(() => setIsProjectDropDownOpen(false));
  return (
    <div className="project_list">
      <div className="project_title">
        <h3>{projectName}</h3>
        <FaEllipsisH
          className="ellipsis_icon"
          onClick={() => {
            setIsProjectDropDownOpen(true);
          }}
        />
        {isProjectDropDownOpen ? <div className="project_dropDown" ref={dropDownRef}>{children}</div> : null}
      </div>
      <Label
        className="label"
        labels={text}

      />
      <p className="project_description">{projectDescription}</p>
      <div className="like">
        <div className="heart">
          <FaHeart
            className="heart_icon"
            onClick={onDoubleClick}
          />
        </div>
        <div className="likes_number">{number}</div>
      </div>

    </div>
  );
};

ProjectList.propTypes = {
  shouldCloseOnEsc: PropTypes.bool,
  projectName: PropTypes.string,
  projectDescription: PropTypes.string,
  onDoubleClick: PropTypes.func,
  children: PropTypes.node,
  number: PropTypes.number,
};

ProjectList.defaultProps = {
  shouldCloseOnEsc: true,
  projectName: '',
  projectDescription: '',
  children: null,
  number: 0,
};

const mapStateToProps = store => ({
  user: store.user,
  editor: store.editor,
});
export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(ProjectList),
);
