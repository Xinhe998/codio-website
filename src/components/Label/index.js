import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';

class Label extends Component {
  render() {
    const {
      className,
      // color,
      labels,
    } = this.props;
    return (
      <div className="labels">
        {labels.length > 0
          ? labels.map((text, index) => (
              <div
                className={classNames(
                  className,
                )}
                key={index}
              >
                {text}
              </div>
            ))
          : null}
      </div>
    );
  }
}

Label.propTypes = {
  labels: PropTypes.array,
  className: PropTypes.string,
  // color: PropTypes.string,
};

Label.defaultProps = {
  labels: [],
  // color: 'light',
};
export default Label;
