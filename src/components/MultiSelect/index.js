import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosClose } from 'react-icons/io';
import action from '../../actions';
import useClickOutside from '../../hooks/useClickOutside';
import './index.scss';

const renderSelectedTags = (selectedOptions, selectedOptionOnClick) => {
  const tags = [];
  selectedOptions.map((option, index) => {
    tags.push(
      <li key={`tag_${option}`} className="tag">
        {option}
        <IoIosClose onClick={() => selectedOptionOnClick(index, option)} />
      </li>,
    );
  });
  return <ul className="MultiSelect__tags">{tags.reverse()}</ul>;
};

const renderDropDown = (options, optionOnClick) => {
  const DropdownOptions = [];
  options.map((option, index) => {
    DropdownOptions.push(
      <li
        key={`dropdownOption_${option}`}
        onClick={() => optionOnClick(option)}
      >
        {option}
      </li>,
    );
  });
  return <ul className="MultiSelect__dropdown">{DropdownOptions}</ul>;
};

const MultiSelect = ({ title, options }) => {
  const [newInput, setNewInput] = useState('');
  const [currentOptions, setCurrentOptions] = useState(options);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isInputOnFocus, setIsInputOnFocus] = useState(false);
  const MultiSelectRef = useRef();
  const MultiSelectInputRef = useRef();

  const searchResult = currentOptions.filter(
    d => d.toLowerCase().includes(newInput.toLowerCase()),
  );

  // 點dropdown裡的選項
  const optionOnClick = (option) => {
    setSelectedOptions([option, ...selectedOptions]);
    setCurrentOptions(currentOptions.filter(item => item !== option));
  };

  // 點tag的叉叉
  const selectedOptionOnClick = (index, text) => {
    const tempOptions = selectedOptions;
    tempOptions.splice(index, 1);
    setSelectedOptions(tempOptions);
    setCurrentOptions([text, ...currentOptions]);
    setIsInputOnFocus(true);
  };

  useClickOutside(isInputOnFocus, MultiSelectRef, () => {
    setIsInputOnFocus(false);
    setNewInput('');
  });

  return (
    <div className="MultiSelect" ref={MultiSelectRef}>
      <span className="MultiSelect__title">{title}</span>
      <div
        className={cx(
          'MultiSelect__input-container',
          isInputOnFocus && 'focus',
        )}
        onClick={() => MultiSelectInputRef.current.focus()}
      >
        {selectedOptions.length ? renderSelectedTags(selectedOptions, selectedOptionOnClick) : null}
        <input
          className="MultiSelect__input"
          value={newInput}
          ref={MultiSelectInputRef}
          onChange={e => setNewInput(e.target.value)}
          onFocus={() => setIsInputOnFocus(true)}
          role="listbox"
          aria-expanded="false"
          aria-busy="false"
          aria-owns="MultiSelect__input-container"
          aria-haspopup="true"
          placeholder=""
          size={newInput.length < 20 ? newInput.length + 2 : 20}
        />
      </div>
      {isInputOnFocus && renderDropDown(searchResult, optionOnClick)}
    </div>
  );
};

MultiSelect.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  allowCreate: PropTypes.bool,
};

MultiSelect.defaultProps = {
  title: '',
  options: [],
  allowCreate: true,
};

const mapStateToProps = store => ({
  user: store.user,
  editor: store.editor,
});
export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(MultiSelect),
);
