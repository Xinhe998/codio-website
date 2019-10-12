import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import logo from '../../assets/codio_logo1.svg';


const Layout = ({
  userImg,
  userName,
  list,
  children,
}) => {
  const LayoutRef = useRef();
  return (
    <div className="Layout">
      <div className="Layout" ref={LayoutRef}>

        <div className="Layout__sidebar">
          <div
            className="logo"
            style={{
              backgroundImage: `url(${logo})`, width: '40%', height: '20%', backgroundRepeat: 'no-repeat', marginBottom: 20,
            }}
          />
          <div
            className="user_img"
            style={{
              backgroundImage: `url(${userImg})`,
            }}
          />
          <h2 className="user_name">{userName}</h2>
          <ul>
            {
              list.map((item, index) => {
                return (
                <li key={index}>{item}</li>
                );
              })

            }

            <li className="logout">登出</li>
          </ul>
        </div>
        <div className="Layout__content">
          <div className="Layout__bg">{children}</div>
        </div>
      </div>
    </div>
  );
};
Layout.propTypes = {
  userImg: PropTypes.string,
  userName: PropTypes.string,
  list: PropTypes.array,
  children: PropTypes.node,
};

Layout.defaultProps = {
  userName: '',
  list: [],
  children: null,
};

export default Layout;
