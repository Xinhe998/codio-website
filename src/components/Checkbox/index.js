import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Checkbox = ({ text, checked, name, onChange }) => {
  return (
    <div>
      <label className="checkbox">
        <input type="checkbox" checked={checked} name={name} onChange={onChange} />
        <span className="text">{text}</span>
        <span className="checkMark" />
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  text: PropTypes.string,
  checked: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  text: '',
  checked: [],
  name: '',
};
export default Checkbox;
