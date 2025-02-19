import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosClose } from 'react-icons/io';
import action from '../../actions';
import './index.scss';
import useClickOutside from '../../hooks/useClickOutside';
import useEscCloseModal from '../../hooks/useEscCloseModal';

const Modal = ({
  isOpen,
  title,
  shouldCloseOnEsc,
  shouldCloseOnClickOutside,
  showControlBtn,
  cancelBtnText,
  confirmBtnText,
  disabled,
  onClose,
  Confirm,
  children,
  history,
  className,
}) => {
  const modalRef = useRef();

  const closeFunc = () => {
    onClose();
    document.body.classList.remove('modal-open');
  };

  const confirmFunc = () => {
    Confirm();
    document.body.classList.remove('modal-open');
  };

  if (shouldCloseOnClickOutside) useClickOutside(isOpen, modalRef, closeFunc);
  if (shouldCloseOnEsc) useEscCloseModal(closeFunc);

  if (isOpen) {
    document.body.classList.add('modal-open');
  }
  return isOpen ? (
    <div className={classNames(className, 'Modal', 'Modal__backdrop')}>
      <div className="Modal__wrapper" ref={modalRef}>
        <div className="Modal__title">
          {title}
          <IoIosClose className="close_btn" onClick={closeFunc} />
        </div>
        <div className="Modal__content">
          {children}
          {showControlBtn ? (
            <div className="Modal__button-group">
              <button
                type="button"
                className="Modal__button-group__cancel"
                onClick={closeFunc}
              >
                {cancelBtnText}
              </button>
              <button
                type="button"
                className="Modal__button-group__confirm"
                onClick={confirmFunc}
                disabled={disabled}
              >
                {confirmBtnText}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  ) : null;
};

Modal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  shouldCloseOnEsc: PropTypes.bool,
  shouldCloseOnClickOutside: PropTypes.bool,
  showControlBtn: PropTypes.bool,
  cancelBtnText: PropTypes.string,
  confirmBtnText: PropTypes.string,
  onClose: PropTypes.func,
  disabled: PropTypes.bool,
  Confirm: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  title: '',
  isOpen: false,
  shouldCloseOnEsc: true,
  showControlBtn: true,
  cancelBtnText: 'Cancel',
  confirmBtnText: 'Save',
  onClose: null,
  Confirm: null,
  children: null,
};

const mapStateToProps = (store) => ({
  user: store.user,
  editor: store.editor,
});
export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(Modal),
);
