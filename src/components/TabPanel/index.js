import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';
import './index.scss';

const DEFAULT_CLASS = 'react-tabs__tab-panel';

class TabPanel extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      children,
      className,
      forceRender,
      id,
      selected,
      selectedClassName,
      tabId,
      ...attributes
    } = this.props;
    return (
      <div
        {...attributes}
        className={cx(className, {
          [selectedClassName]: selected,
        })}
        role="tabpanel"
        id={id}
        aria-labelledby={tabId}
      >
        {forceRender || selected ? children : null}
      </div>
    );
  }
}

TabPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  forceRender: PropTypes.bool,
  id: PropTypes.string, // private
  selected: PropTypes.bool, // private
  selectedClassName: PropTypes.string,
  tabId: PropTypes.string, // private
};
TabPanel.defaultProps = {
  className: DEFAULT_CLASS,
  forceRender: false,
  selectedClassName: `${DEFAULT_CLASS}--selected`,
};
export default TabPanel;
