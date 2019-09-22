import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useAutoSize from '../../hooks/useAutoSize';
import './index.scss';

const TextInput = ({
  type,
  placeholder,
  text,
  title,
  onChange,
  required,
  onFocus,
  onBlur,
  icon,
}) => {
  const textareaRef = useRef();
  useAutoSize(textareaRef);
  return (
    <div
      className={classNames(
        'textinput',
        required ? 'required' : null,
      )}
    >
      <span className="textinput__title">{title}</span>
      <textarea
        type={type}
        value={text}
        placeholder={placeholder}
        onChange={e => onChange(e)}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={textareaRef}
      />
      <div className="textinput__icon">{icon}</div>
    </div>
  );
};

TextInput.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  placeholder: PropTypes.string,
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
