import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';

class TextInput extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      type, placeholder, text, title, onChange, required,
    } = this.props;
    return (
      <div className={classNames('textinput', required ? 'required' : null)}>
        <span className="textinput__title">{title}</span>
        <input
          type={type}
          value={text}
          placeholder={placeholder}
          onChange={e => onChange(e)}
        />
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
  warningText: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

TextInput.defaultProps = {
  type: 'text',
  text: '',
};
export default TextInput;
