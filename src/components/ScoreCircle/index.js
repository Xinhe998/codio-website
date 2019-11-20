import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './index.scss';

const ScoreCircle = ({ theme, score, text }) => (
  <div className={cx('score_circle', `theme_${theme}`)}>
    {score}
    <span className="score_circle_desc">{text}</span>
  </div>
);

ScoreCircle.propTypes = {
  theme: PropTypes.string,
  score: PropTypes.number,
};

ScoreCircle.defaultProps = {
  theme: '',
  score: 0,
};

export default ScoreCircle;
