import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaAngleDown } from 'react-icons/fa';
import useClickOutside from '../../hooks/useClickOutside';
import './index.scss';

const Select = ({
  isOpen,
  switchOptionHandler,
  title,
  required,
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const selectRef = useRef();
  useClickOutside(isOpen, selectRef, () => switchOptionHandler(false));
  return (
    <div className="select" ref={selectRef}>
      <div className={classNames(
        'select_title',
        required ? 'required' : null,
      )}
      >
        {title}
      </div>
      <div
        className="select_input"
        onClick={() => switchOptionHandler(true)}
      >
        <span className="select_value">{selectedOption}</span>

        {isOpen ? (
          <ul className="select_dropDown">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={(e) => {
                  switchOptionHandler(false);
                  e.stopPropagation();
                  setSelectedOption(option);
                }}
                
                className={selectedOption === option ? 'select_dropDown_option active' : 'select_dropDown_option'}
              >
                {option}
              </li>
            ))}
          </ul>
        ) : null}
        <span className="select＿icon">
          <FaAngleDown
            color="#3597ec"
          />
        </span>
      </div>

    </div>
  );
};

Select.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array,
  switchOptionHandler: PropTypes.func,
  selectedOption: PropTypes.string,
  setSelectedOption: PropTypes.string,
};

Select.defaultProps = {
  isOpen: false,
  title: '',
  switchOptionHandler: null,
  options: [],
};
export default Select;
