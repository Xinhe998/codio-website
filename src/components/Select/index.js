import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';

const Select = ({
  title,
  value,
  name,
  onChange,
  required,
  options,
}) => (
  <div className="select">
    <div className={classNames(
      'select-title',
      required ? 'required' : null,
    )}
    >
      {title}
    </div>
    <div className="custom-select">
      <div className="custom-select-value">{value}</div>
      <select
        name={name}
        onChange={e => onChange(e)}
      >
        {
          { options }.map((item) => {
            if (value === item.value) {
              return <option selected value={item.value}>{item.label}</option>;
            }
            return <option value={item.value}>{item.label}</option>;
          })

        }
      </select>
    </div>
  </div>
);

Select.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  options: PropTypes.array,
};

Select.defaultProps = {
  title: '',
  value: '',
  name: '',
  options: [],
};
export default Select;
