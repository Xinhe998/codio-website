import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useAutoSize from '../../hooks/useAutoSize';
import './index.scss';

const TextArea = ({
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
        className="textarea"
        type={type}
        value={text}
        placeholder={placeholder}
        onChange={e => onChange(e)}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={textareaRef}
      />
    </div>
  );
};

TextArea.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

TextArea.defaultProps = {
  type: 'text',
  text: '',
  onBlur: null,
  onFocus: null,
};
export default TextArea;
