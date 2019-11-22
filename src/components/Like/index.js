import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import './index.scss';

const Like = ({ isLiked, likeCount, projectId }) => {
  return (
    <div className="like">
      <div className="heart">
        {isLiked ? (
          <FaHeart className="heart_icon" onClick={() => {}} />
        ) : (
          <FaRegHeart className="heart_icon" onClick={() => {}} />
        )}
      </div>
      <div className="likes_number">{likeCount}</div>
    </div>
  );
};

Like.propTypes = {
  isLiked: PropTypes.bool,
  likeCount: PropTypes.number,
};

Like.defaultProps = {
  isLiked: false,
  likeCount: 0,
};

export default Like;
