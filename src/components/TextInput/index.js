import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IoIosWarning, IoIosCheckmarkCircle } from 'react-icons/io';
import Button from '../Button';
import './index.scss';

const TextInput = React.forwardRef(({
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
  disabled,
  icon,
  showPostBtn,
  postBtnText,
  postBtnOnClick,
  readonly
}, ref) => {
  return (
    <div
      className={classNames(
        'textinput',
        required ? 'required' : null,
        showHint ? hintType || null : null,
      )}
    >
      {title ? <span className="textinput__title">{title}</span> : null}
      <input
        type={type}
        value={text}
        placeholder={placeholder}
        onChange={e => onChange(e)}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        readOnly={readonly}
        ref={ref}
      />
      <div className="textinput__icon">{icon}</div>
      {showPostBtn ? (
        <Button className="textinput__postBtn" type="primary" size="small" theme="blue" text={postBtnText} onClick={postBtnOnClick} />
      ) : null}
      {showHint ? (
        <span className="textinput__hint">
          <span className="hinttext">{hintText}</span>
          {hintType === 'error' ? <IoIosWarning /> : null}
          {hintType === 'ok' ? <IoIosCheckmarkCircle /> : null}
        </span>
      ) : null}
    </div>
  );
});

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
  disabled: PropTypes.bool,
  icon: PropTypes.any,
  showPostBtn: PropTypes.bool,
  postBtnText: PropTypes.string,
  readonly: PropTypes.bool,
  postBtnOnClick: PropTypes.func,
};

TextInput.defaultProps = {
  type: 'text',
  text: '',
  onBlur: null,
  onFocus: null,
  disabled: false,
  readonly: false,
};
export default TextInput;
