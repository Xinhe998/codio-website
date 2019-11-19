import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaAlignLeft } from 'react-icons/fa';
import action from '../../actions';
import Button from '../Button';
import useClickOutside from '../../hooks/useClickOutside';
import useEscCloseModal from '../../hooks/useEscCloseModal';
import './index.scss';


const ResumeBtn = ({
  isOpen,
  shouldCloseOnEsc,
  shouldCloseOnClickOutside,
  onClose,
  onClick,
  children,
}) => {
  const resumeBtnRef = useRef();
  if (shouldCloseOnClickOutside) useClickOutside(isOpen, resumeBtnRef, onClose);
  if (shouldCloseOnEsc) useEscCloseModal(onClose);
  return (
    <div className="resumeBtn">
      <Button
        text="履歷"
        className="resumeBtn_btn"
        type="outline"
        size="small"
        theme="red"
        // icon={<FaAlignLeft />}
        onClick={onClick}
      />
      {isOpen ? <div className="resumeBtn_dropDown" ref={resumeBtnRef}>{children}</div> : null}
    </div>
  );
};

ResumeBtn.propTypes = {
  isOpen: PropTypes.bool,
  shouldCloseOnEsc: PropTypes.bool,
  shouldCloseOnClickOutside: PropTypes.bool,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

ResumeBtn.defaultProps = {
  isOpen: false,
  shouldCloseOnEsc: true,
  onClose: null,
  children: null,
};

const mapStateToProps = store => ({
  user: store.user,
  editor: store.editor,
});
export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(ResumeBtn),
);
