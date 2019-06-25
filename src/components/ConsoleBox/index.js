import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Console } from 'console-feed';

import './index.scss';

class ConsoleBox extends Component {
  render() {
    return (
      <div className="console-box">
        <Console logs={this.props.logs} variant="dark" />
      </div>
    );
  }
}
ConsoleBox.propTypes = {
  logs: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
};
export default ConsoleBox;
