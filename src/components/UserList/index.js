import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { isRequired } from 'calidators';
import { connect } from 'react-redux';
import action from '../../actions';
import TextArea from '../TextArea';
import Button from '../Button';
import Modal from '../Modal';
import TextInput from '../TextInput';
import Select from '../Select';
import './index.scss';


const UserList = ({
  userNumber,
  userImg,
  userName,
  userType,
}) => {
  const [text, setText] = useState('');
  const [charType, setCharType] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const charTypeValidator = isRequired({ message: '請輸入會員角色' })(
    charType,
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userCharOptions = ['VIP', 'VVIP'];
  const [selectedOption, setSelectedOption] = useState(userCharOptions[0]);
  return (

    <React.Fragment>
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
        <div className="edit_user_btn">
          <Button
            className="user_btn"
            text="編輯"
            type="outline"
            size="min"
            theme="blue"
            onClick={() => { setIsEditModalOpen(true); }}
          />
        </div>
      </td>
      <Modal
        isOpen={isEditModalOpen}
        title="編輯"
        onClose={() => { setIsEditModalOpen(false); }}
        shouldCloseOnEsc
        shouldCloseOnClickOutside
        showControlBtn
        cancelBtnText="取消"
        confirmBtnText="儲存"
        disabled={charTypeValidator !== null}
      >
        <TextInput
          title="會員名稱"
          text={userName}
          disabled
        />
        <Select
          title="會員角色"
          options={userCharOptions}
          required
          isOpen={isDropdownOpen}
          switchOptionHandler={setIsDropdownOpen}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <div className="user_uses">
          <div className="title">使用功能</div>
          <div className="multi_choice">
            <h5>111</h5>
          </div>
        </div>
      </Modal>

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
