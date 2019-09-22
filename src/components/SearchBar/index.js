import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosClose } from 'react-icons/io';
import action from '../../actions';

import Button from '../Button';
import TextInput from '../TextInput';
import './index.scss';


const SearchBar = () => (

  <div className="searchBar">
    <TextInput
      className="searchBar_input" 
      type="text"
      placeholder="搜尋會員"
      // text={}
      // onChange={}
      />
    <Button
      className="searchBar_btn"
      type="primary"
      size="small"
      theme="red"
      shape="square"
    />
  </div>

);

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
  )(SearchBar),
);
