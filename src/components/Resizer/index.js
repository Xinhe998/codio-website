import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class Resizer extends Component {
  constructor() {
    super();
    this.state = {
      startPosition_x: 0,
      startPosition_y: 0,
    };
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = (e) => {
    e.preventDefault();
    const { direction } = this.props;
    if (direction === 'x') {
      const startX = this.state.startPosition_x; // 起始位置
      const w = window.innerWidth; // 畫面寬
      const diff = (startX - e.clientX) / w;
      if (diff !== 0) {
        this.props.onResize(diff);
      }
    }
    if (direction === 'y') {
      var diff = this.state.startPosition_y - e.clientY;
      if (diff !== 0) {
        this.props.onResize(this.state.startPosition_y - e.clientY);
      }
    }
  };

  handleMouseUp = (e) => {
    this.props.onResizeEnd();
    this.updateStartPosition(e);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseDown = (e) => {
    e.preventDefault();
    this.updateStartPosition(e);
    this.props.onResizeStart(e);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
  };

  updateStartPosition = (e) => {
    this.setState({
      startPosition_x: e.clientX,
      startPosition_y: e.clientY,
    });
  };

  render() {
    return (
      <div className="resizer">
        <div className="handle" onMouseDown={e => this.handleMouseDown(e)} />
        {this.props.children}
      </div>
    );
  }
}

Resizer.propTypes = {
  className: PropTypes.string,
  handleClassName: PropTypes.string,
  direction: PropTypes.string,
  onResizeStart: PropTypes.func,
  onResize: PropTypes.func.isRequired,
  onResizeEnd: PropTypes.func,
};

Resizer.defaultProps = {
  className: '',
  handleClassName: '',
  direction: 'x',
};
export default Resizer;
