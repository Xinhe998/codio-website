import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import action from '../../actions';

import TextInput from '../TextInput';
import './index.scss';


const SearchBar = ({ placeholder }) => {
  const [text, setText] = useState('');
  return (

    <div className="searchBar">
      <TextInput
        className="searchBar_input"
        type="text"
        placeholder={placeholder}
        text={text}
        onChange={e => setText(e.target.value)}
        icon={<FaSearch />}
      />
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: '',
};

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
