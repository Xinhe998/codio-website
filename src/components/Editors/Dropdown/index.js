import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import useClickOutside from '../../../hooks/useClickOutside';

const Dropdown = ({
  icon, options, swichOptionHandler, isOpen 
}) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef();
  useClickOutside(isOpen, dropdownRef, () => swichOptionHandler(false));
  return (
    <div className="Dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="Dropdown__button"
        onClick={() => swichOptionHandler(!isOpen)}
      >
        {icon}
      </button>
      {isOpen ? (
        <div className="Dropdown__tooltip">
          <ul className="Dropdown__tooltip__list">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  // setSelectedOption(option);
                  swichOptionHandler(false);
                }}
                className={
                  selectedOption === option
                    ? 'Dropdown__tooltip__list__option active'
                    : 'Dropdown__tooltip__list__option'
                }
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
Dropdown.propTypes = {
  icon: PropTypes.object,
  options: PropTypes.array,
  swichOptionHandler: PropTypes.func,
  isOpen: PropTypes.bool,
};

Dropdown.defaultProps = {
  options: [],
  swichOptionHandler: null,
  isOpen: false,
};
export default Dropdown;
