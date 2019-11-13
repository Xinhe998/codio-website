import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './index.scss';

const CheckboxGroup = ({ title, options, required, name, value, onChange }) => {
  return (
    <div className={cx('CheckboxGroup', required ? 'required' : null)}>
      <span className="CheckboxGroup__title">{title}</span>
      <div className="CheckboxGroup__container">
        {options.map((option, index) => (
          <label
            key={option}
            className={cx(
              'CheckboxGroup__option',
              option === value && 'checked',
            )}
          >
            {option}
            <input
              type="radio"
              id={option}
              value={option}
              name={name}
              checked={value === option}
              onChange={e => onChange(e.target.value)}
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
  value: PropTypes.string,
  onChange: PropTypes.func,
};

CheckboxGroup.defaultProps = {
  title: '',
  name: '',
  options: [],
  value: '',
};
export default CheckboxGroup;
