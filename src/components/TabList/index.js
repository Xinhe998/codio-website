import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

class TabList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { children, className, ...attributes } = this.props;
    return (
      <ul {...attributes} className={cx(className)} role="tablist">
        {children}
      </ul>
    );
  }
}

TabList.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
};
TabList.defaultProps = {};
export default TabList;
