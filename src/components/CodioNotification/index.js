import React from 'react';
import default_avatar from '../../assets/default_avatar.jpg';

const CodioNotification = ({ name, avatar }) => {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#516d8d',
        borderRadius: 5,
        width: '300px',
        height: '70px',
        alignItems: 'center',
      }}
    >
      <div
        className="userinfo"
        style={{
          backgroundImage: `url(${avatar || default_avatar})`,
        }}
      ></div>
      <h4>{name} 已加入到專案</h4>
    </div>
  );
};

export default CodioNotification;
