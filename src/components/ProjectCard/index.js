import React from 'react';
import { IoIosEye, IoIosHeart } from 'react-icons/io';

import './index.scss';
import bookmark from '../../assets/bookmark-solid.svg';

const ProjectCard = ({
  img,
  title,
  avatar,
  viewCount,
  likeCount,
  showPlace,
  place,
}) => (
  <div className="ProjectCard">
    {showPlace ? <div className="ProjectCard__place">{place}</div> : null}
    <div className="ProjectCard__container">
      <img
        className="ProjectCard__thumbImg"
        src={img}
        alt="projectThumbImgage"
      />
      <div className="ProjectCard__info">
        <img className="ProjectCard__avatar" src={avatar} alt="avatar" />
        <div className="">
          <p className="ProjectCard__title">{title}</p>
          <span>
            <IoIosEye />
            {viewCount}
          </span>
          <span>
            <IoIosHeart />
            {likeCount}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectCard;
