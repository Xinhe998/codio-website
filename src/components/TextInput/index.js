import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IoIosWarning, IoIosCheckmarkCircle } from 'react-icons/io';
import './index.scss';

const TextInput = ({
  type,
  placeholder,
  text,
  title,
  onChange,
  required,
  showHint,
  hintType,
  hintText,
  onFocus,
  onBlur,
  icon,
}) => {
  return (
    <div
      className={classNames(
        'textinput',
        required ? 'required' : null,
        showHint ? hintType || null : null,
      )}
    >
      <span className="textinput__title">{title}</span>
      <input
        type={type}
        value={text}
        placeholder={placeholder}
        onChange={e => onChange(e)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <div className="textinput__icon">{icon}</div>
      {showHint ? (
        <span className="textinput__hint">
          <span className="hinttext">{hintText}</span>
          {hintType === 'error' ? <IoIosWarning /> : null}
          {hintType === 'ok' ? <IoIosCheckmarkCircle /> : null}
        </span>
      ) : null}
    </div>
  );
};

TextInput.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  showHint: PropTypes.bool,
  hintType: PropTypes.string,
  hintText: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  icon: PropTypes.any,
};

TextInput.defaultProps = {
  type: 'text',
  text: '',
  onBlur: null,
  onFocus: null,
};
export default TextInput;
