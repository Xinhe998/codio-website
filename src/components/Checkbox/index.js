import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './index.scss';

const Checkbox = ({ text, checked, name, onChange }) => {
  return (
    <label className="checkbox">
      <input type="checkbox" checked={checked} name={name} onChange={onChange} />
      <span className="checkmark" />
    </label>
  );
};

Checkbox.propTypes = {
  text: PropTypes.string,
  checked: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  text: '',
  checked: false,
  name: '',
};
export default Checkbox;
