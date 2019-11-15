import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './index.scss';

const ScoreCircle = ({ theme, score }) => <div className={cx('score_circle', `theme_${theme}`)}>{score}</div>;

ScoreCircle.propTypes = {
  theme: PropTypes.string,
  score: PropTypes.number,
};

ScoreCircle.defaultProps = {
  theme: '',
  score: 0,
};

export default ScoreCircle;
