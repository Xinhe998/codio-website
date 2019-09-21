import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './index.scss';

const RadioButtonGroup = ({ title, options, required, name, defaultChecked }) => {
  const [radioValue, setRadioValue] = useState('');
  useEffect(() => {
    // 預設勾選
    setRadioValue(options[defaultChecked - 1]);
  });
  return (
    <div className={cx('radioButtonGroup', required ? 'required' : null)}>
      <span className="radioButtonGroup__title">{title}</span>
      <div className="radioButtonGroup__container">
        {options.map((option, index) => (
          <label
            key={option}
            className={cx(
              'radioButtonGroup__option',
              option === radioValue && 'checked',
            )}
          >
            {option}
            <input
              type="radio"
              id={option}
              value={option}
              name={name}
              checked={radioValue === option}
              onChange={e => setRadioValue(e.target.value)}
            />
            <span className="checkmark" />
          </label>
        ))}
      </div>
    </div>
  );
};

RadioButtonGroup.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  required: PropTypes.bool,
  name: PropTypes.string,
  defaultChecked: PropTypes.number,
};

RadioButtonGroup.defaultProps = {
  title: '',
  name: '',
  options: [],
  defaultChecked: 1,
};
export default RadioButtonGroup;
