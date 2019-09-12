import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IoIosWarning, IoIosCheckmarkCircle } from 'react-icons/io';
import './index.scss';

class TextInput extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      type,
      placeholder,
      text,
      title,
      onChange,
      required,
      showHint,
      hintType,
      hintText,
    } = this.props;
    return (
      <div
        className={classNames(
          'textinput',
          required ? 'required' : null,
          showHint ? (hintType || null) : null,
        )}
      >
        <span className="textinput__title">{title}</span>
        <input
          type={type}
          value={text}
          placeholder={placeholder}
          onChange={e => onChange(e)}
        />
        {showHint ? (
          <span className="textinput__hint">
            <span className="hinttext">
              {hintText}
            </span>
            {hintType === 'error' ? <IoIosWarning /> : null}
            {hintType === 'ok' ? <IoIosCheckmarkCircle /> : null}
          </span>
        ) : null}
      </div>
    );
  }
}

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
};

TextInput.defaultProps = {
  type: 'text',
  text: '',
};
export default TextInput;
