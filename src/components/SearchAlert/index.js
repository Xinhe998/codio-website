import React from 'react';
import PropTypes from 'prop-types';
import { IoIosClose } from 'react-icons/io';

import './index.scss';

const SearchAlert = ({ text, onClose }) => (
  <div className="SearchAlert">
    {text}
    <IoIosClose className="SearchAlert__CloseBtn" onClick={onClose} />
  </div>
);

SearchAlert.propTypes = {
  text: PropTypes.string,
  onClose: PropTypes.func,
};

SearchAlert.defaultProps = {
  text: '',
};

export default SearchAlert;
