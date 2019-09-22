import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosClose } from 'react-icons/io';
import action from '../../actions';

import Button from '../Button';
import './index.scss';


const Filter = ({
  isOpen,
  title,
  shouldCloseOnEsc,
  shouldCloseOnClickOutside,
  showControlBtn,
  cancelBtnText,
  confirmBtnText,
  onClose,
  Confirm,
  children,
  history,
}) => {
  const filterRef = useRef();
  return (
    <div className="filter">
      <Button
        className="filter_btn"
        type="primary"
        size="small"
        theme="white"
        shape="square"
      />
      <div className="filter_dropDown">{children}</div>
    </div>
  );
};

// SearchBar.propTypes = {

// };

// SearchBar.defaultProps = {

// };

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
