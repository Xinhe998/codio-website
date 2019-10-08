import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaFilter } from 'react-icons/fa';
import action from '../../actions';
import Button from '../Button';
import useClickOutside from '../../hooks/useClickOutside';
import useEscCloseModal from '../../hooks/useEscCloseModal';
import './index.scss';


const Filter = ({
  isOpen,
  shouldCloseOnEsc,
  shouldCloseOnClickOutside,
  onClose,
  onClick,
  children,
  history,
}) => {
  const filterRef = useRef();
  if (shouldCloseOnClickOutside) useClickOutside(isOpen, filterRef, onClose);
  if (shouldCloseOnEsc) useEscCloseModal(onClose);
  return (
    <div className="filter" ref={filterRef}>
      <Button
        className="filter_btn"
        type="primary"
        size="small"
        theme="white"
        shape="square"
        icon={<FaFilter />}
        onClick={onClick}
      />
      {isOpen ? <div className="filter_dropDown">{children}</div> : null}
    </div>
  );
};

Filter.propTypes = {
  isOpen: PropTypes.bool,
  shouldCloseOnEsc: PropTypes.bool,
  shouldCloseOnClickOutside: PropTypes.bool,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Filter.defaultProps = {
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
  )(Filter),
);
