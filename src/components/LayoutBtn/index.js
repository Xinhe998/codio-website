import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class LayoutBtn extends Component {
  render() {
    const {
      children,
    } = this.props;
    return (
      <div className="actions_wrapper">
        {children}
      </div>

    );
  }
}

LayoutBtn.propTypes = {
  children: PropTypes.node,
};

LayoutBtn.defaultProps = {
  children: null,
};

export default LayoutBtn;
