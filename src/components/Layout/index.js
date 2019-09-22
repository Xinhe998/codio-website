import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import mockup from '../../assets/smartmockups_jxfuqv8i.jpg';

const Layout = ({
  userImg,
  userName,
  list,
  // isOpen,
  // title,
  // shouldCloseOnEsc,
  // shouldCloseOnClickOutside,
  // showControlBtn,
  // cancelBtnText,
  // confirmBtnText,
  // onClose,
  // Confirm,
  children,
  // history
}) => {
  const LayoutRef = useRef();
  return (
    <div className="Layout">
      <div className="Layout" ref={LayoutRef}>

        <div className="Layout__sidebar">
          <div
            className="logo"
            style={{ backgroundImage: `url(${mockup})` }}
          />
          <div
            className="user-img"
            style={{ backgroundImage: `url(${userImg})` }}
          />
          <h2 className="user-name">{userName}</h2>
          <ul>
            <li>{list}</li>
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
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;