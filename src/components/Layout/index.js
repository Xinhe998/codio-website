import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import action from '../../actions';
import './index.scss';
import logo from '../../assets/codio_logo.svg';

const Layout = ({ userImg, userName, list, children, history, logout, resetPortfolio, resetAll }) => {
  const LayoutRef = useRef();
  return (
    <div className="Layout" ref={LayoutRef}>
      <div className="Layout__sidebar">
        <div
          className="logo"
          style={{
            backgroundImage: `url(${logo})`,
            cursor: 'pointer',
          }}
          onClick={() => history.push('/homePage')}
        />
        <div
          className="user_img"
          style={{
            backgroundImage: `url(${userImg})`,
          }}
        />
        <h2 className="user_name">{userName}</h2>
        <ul>
          {list.map((item) => (

            <li key={item.text}>
              <NavLink to={item.link} activeClassName="active">
                {item.text}
              </NavLink>
            </li>

          ))}
          <li
            className="logout"
            key="登出"
            onClick={() => {
              resetPortfolio();
              resetAll();
              logout(history);
            }}
          >
            登出
          </li>
        </ul>
      </div>
      <div className="Layout__content">{children}</div>
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

const mapStateToProps = store => ({
  user: store.user,
  project: store.project,
  portfolio: store.portfolio,
});

export default withRouter(connect(mapStateToProps, action)(Layout));
