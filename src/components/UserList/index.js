import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosClose } from 'react-icons/io';
import action from '../../actions';
import Button from '../../components/Button';
import './index.scss';


const UserList = () => {
  return (

    <React.Fragment className="user">
      <td className="user_number">1</td>
      <td className="user_name">1</td>
      <td className="user_operation">
        <Button
          className="user_btn"
          text="查看"
          type="outline"
          size="small"
          theme="green"
        />
        <Button
          className="user_btn"
          text="編輯"
          type="outline"
          size="small"
          theme="blue"
        />
        <Button
          className="user_btn"
          text="停用"
          type="outline"
          size="small"
          theme="red"
        />
      </td>
      <td><hr /></td>
    </React.Fragment>

  );
};

// UserList.propTypes = {

// };

// UserList.defaultProps = {

// };

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
