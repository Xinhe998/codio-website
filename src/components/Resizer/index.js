import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class Resizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startPosition_x: 0,
      startPosition_y: 0,
      elWidth: this.props.elementWidth,
      resizeDiff: 0,
      windowW: window.innerWidth,
    };
    this.resizerRef = React.createRef();
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = (e) => {
    e.preventDefault();
    const { direction } = this.props;
    const { startPosition_x, startWidth, windowW, elWidth } = this.state;

    if (direction === 'x') {
      const startX = startPosition_x; // 起始位置
      const diff = (startX - e.clientX) / windowW;
      if (diff !== 0) {
        this.setState({
          resizeDiff: diff,
        });
        this.props.widthOnChange(startWidth - diff);
      }
    }
  };

  handleMouseUp = (e) => {
    console.log("onMouseUp");
    const { startWidth, resizeDiff } = this.state;
    this.props.widthOnChange(startWidth - resizeDiff);
    this.updateStartPosition(e);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
  };

  handleMouseDown = (e) => {
    console.log("onMouseDown");
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    const { elementWidth } = this.props;
    e.preventDefault();
    const startWidth = elementWidth;
    this.setState({
      startWidth,
    });
    this.updateStartPosition(e);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
  };

  updateStartPosition = (e) => {
    this.setState({
      startPosition_x: e.clientX,
    });
  };

  render() {
    const { elementWidth, children } = this.props;
    return (
      <div className="resizer" ref={this.resizerRef} style={{ width: `${elementWidth * 100}%` }}>
        <div>
          {children}
        </div>
        <div
          className="handle"
          style={{ left: `${elementWidth * 100}%` }}
          onMouseDown={e => this.handleMouseDown(e)}
          onMouseUp={e => this.handleMouseUp(e)}
        />
      </div>
    );
  }
}

Resizer.propTypes = {
  className: PropTypes.string,
  handleClassName: PropTypes.string,
  direction: PropTypes.string,
  onResizeStart: PropTypes.func,
  onResize: PropTypes.func,
  onResizeEnd: PropTypes.func,
  elementWidth: PropTypes.number,
  widthOnChange: PropTypes.func,
};

Resizer.defaultProps = {
  className: '',
  handleClassName: '',
  direction: 'x',
};
export default Resizer;
