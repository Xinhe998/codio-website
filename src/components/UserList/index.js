import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import action from '../../actions';
import TextArea from '../TextArea';
import Button from '../Button';
import './index.scss';

const UserList = ({
  userNumber,
  userImg,
  userName,
  userType,
}) => {
  const [text, setText] = useState('');

  return (

    <React.Fragment className="user">
      <td className="user_number">{userNumber}</td>
      <td className="user_info">
        <img className="user_img" src={userImg} alt="會員圖片" />
        <div className="user_name">
          <h5>{userName}</h5>
          <span className="user_type">{userType}</span>
        </div>
      </td>
      <td className="user_msg">
        <TextArea
          text={text}
          onChange={e => setText(e.target.value)}
        />
      </td>
      <td className="user_operation">
        <Button
          className="user_btn"
          text="編輯"
          type="outline"
          size="min"
          theme="blue"
        />
      </td>

    </React.Fragment>
  );
};

UserList.propTypes = {
  userNumber: PropTypes.number,
  userImg: PropTypes.string,
  userName: PropTypes.string,
  userType: PropTypes.string,
};

UserList.defaultProps = {
  userName: '',
  userType: '一般',
};

const mapStateToProps = store => ({
  user: store.user,
  editor: store.editor,
});
export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(UserList),
);
