import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';

class Label extends Component {
  render() {
    const {
      className,
      color,
      text,
    } = this.props;
    return (
      <div
        className={classNames(
          className,
          color ? `color${color}` : null,
        )}
      >
        {text}
      </div>
    );
  }
}

Label.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
};

Label.defaultProps = {
  text: '',
  color: 'dark',
};
export default Label;
