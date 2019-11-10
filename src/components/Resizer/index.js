import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class Resizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startPositionX: 0,
      startPositionY: 0,
      isDragging: false,
    };
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = (e) => {
    window.requestAnimationFrame(() => {
      const { direction, widthOnChange } = this.props;
      const { startPositionX, startWidth, isDragging } = this.state;
      if (direction === 'x' && isDragging) {
        const diff = startPositionX - e.clientX;
        if (diff !== 0) {
          widthOnChange(startWidth - diff);
        }
      }
    });
  };

  handleMouseUp = (e) => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    this.setState({
      isDragging: false,
    });
  };

  handleMouseDown = (e) => {
    const { elementWidth } = this.props;
    e.preventDefault();
    const startWidth = elementWidth;
    this.setState({
      startWidth,
      startPositionX: e.clientX,
      isDragging: true,
    });
    window.addEventListener('mousemove', this.handleMouseMove);
  };

  render() {
    const { elementWidth, children } = this.props;
    return (
      <div className="resizer" style={{ width: `${elementWidth}px` }}>
        {this.state.isDragging ? (
          <div className="drag-overlay" onMouseUp={this.handleMouseUp} />
        ) : null}
        <div>{children}</div>
        <div
          className="handle"
          style={{ left: `calc(${elementWidth}px - 9px)` }}
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
