import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';

class Button extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      text,
      size,
      type,
      shape,
      onClick,
      disabled,
      className,
      theme,
      icon,
    } = this.props;
    return (
      <button
        type="button"
        className={classNames(
          className,
          size,
          `type_${type}`,
          shape ? `shape_${shape}` : null,
          theme ? `theme_${theme}` : null,
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
        {icon}
      </button>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  shape: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  theme: PropTypes.string,
};

Button.defaultProps = {
  text: '',
  size: '',
  type: 'primary',
};
export default Button;
