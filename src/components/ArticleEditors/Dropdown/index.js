import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import useClickOutside from '../../../hooks/useClickOutside';

const Dropdown = ({ options, swichOptionHandler, isOpen }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef();
  useClickOutside(isOpen, dropdownRef, () => swichOptionHandler(false));
  return (
    <div className="Dropdown" ref={dropdownRef}>
      {isOpen ? (
        <div className="Dropdown__tooltip">
          <ul className="Dropdown__tooltip__list">
            {Object.values(options).map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  option[2]();
                  swichOptionHandler(false);
                }}
                className={
                  selectedOption === option
                    ? 'Dropdown__tooltip__list__option active'
                    : 'Dropdown__tooltip__list__option'
                }
              >
                {option[0]}
                {option[1]}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
Dropdown.propTypes = {
  options: PropTypes.object,
  swichOptionHandler: PropTypes.func,
  isOpen: PropTypes.bool,
};

Dropdown.defaultProps = {
  options: [],
  swichOptionHandler: null,
  isOpen: false,
};
export default Dropdown;
