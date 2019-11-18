import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import useAutoSize from '../../hooks/useAutoSize';
import './index.scss';

const TextArea = React.forwardRef(
  (
    {
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
      onEnter,
      defaultRowCount,
    },
    ref,
  ) => {
    let textareaRef;
    if (!ref) {
      textareaRef = useRef();
    } else {
      textareaRef = ref;
    }
    if (isAutoSize) useAutoSize(textareaRef, maxHeight, defaultRowCount);
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
          // onCompositionUpdate={(e)=>this.chInProcessing=true}
          onKeyPress={(e) => {
            if (onEnter && !e.shiftKey) {
              if (e.key === 'Enter') {
                e.preventDefault();
                onEnter();
              }
            }
          }}
          ref={textareaRef}
        />
      </div>
    );
  },
);

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
