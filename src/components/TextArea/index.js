import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
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
  isAutoSize,
  maxHeight,
}) => {
  const textareaRef = useRef();
  if (isAutoSize) useAutoSize(textareaRef, maxHeight);
  return (
    <div className={cx('textinput', required ? 'required' : null)}>
      {title ? <span className="textinput__title">{title}</span> : null}
      <textarea
        className="textarea"
        type={type}
        value={text}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
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
  isAutoSize: PropTypes.bool,
  maxHeight: PropTypes.number,
};

TextArea.defaultProps = {
  type: 'text',
  text: '',
  onBlur: null,
  onFocus: null,
  isAutoSize: true,
};
export default TextArea;
