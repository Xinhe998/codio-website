import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isRequired } from 'calidators';
import action from '../../actions';

import Layout from '../../components/Layout';
import LayoutBtn from '../../components/LayoutBtn';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import Checkbox from '../../components/Checkbox';
import Select from '../../components/Select';
import Modal from '../../components/Modal';
import UserList from '../../components/UserList';
import SearchBar from '../../components/SearchBar';
import Filter from '../../components/Filter';

import './index.scss';
import userImg from '../../assets/userImg.png';

const Admin = (props) => {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');

  const [userName, setUserName] = useState('Alice');
  const [list, setList] = useState(['會員管理']);
  const displayPagesOptions = ['5', '10', '15', '20'];

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectValue, setSelectValue] = useState('25');
  const options = ['0'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [charName, setCharName] = useState('');
  const charNameValidator = isRequired({ message: '請輸入角色名稱' })(charName);
  const [isChecked, setIsChecked] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectCheckbox = (choice) => {
    const index = isChecked.indexOf(choice);
    if (index !== -1) {
      setIsChecked(isChecked.filter((item) => item !== choice));
    } else {
      setIsChecked([choice, ...isChecked]);
    }
  };
  const loginHandler = () => {
    const loginData = {
      id,
      password,
    };
    props.login(loginData, props.history);
  };

  const addChar = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="Admin">
      <Layout userImg={userImg} userName={userName} list={list}>
        <LayoutBtn>
          <Button
            className="add_user_btn"
            text="新增角色"
            type="primary"
            size="small"
            theme="red"
            onClick={addChar}
          />
        </LayoutBtn>
        <div className="main_section">
          <div className="user_management">
            <div className="user_tool">
              <div className="display_number">
                <span>
                  顯示
                  <Select
                    options={displayPagesOptions}
                    isOpen={isDropdownOpen}
                    switchOptionHandler={setIsDropdownOpen}
                  />
                  筆
                </span>
              </div>

              <SearchBar placeholder="搜尋會員" />
              <Filter
                isOpen={isFilterOpen}
                onClick={() => {
                  setIsFilterOpen(true);
                }}
                onClose={() => {
                  setIsFilterOpen(false);
                }}
                shouldCloseOnClickOutside
                shouldCloseOnEsc
              >
                <span className="filter_title">會員</span>
                <hr />
                <Checkbox
                  text="一般"
                  checked={isChecked.indexOf('一般') !== -1}
                  name="member_checkbox"
                  onChange={() => {
                    handleSelectCheckbox('一般');
                  }}
                />
                <Checkbox
                  text="VIP"
                  checked={isChecked.indexOf('VIP') !== -1}
                  name="member_checkbox"
                  onChange={() => {
                    handleSelectCheckbox('VIP');
                  }}
                />
              </Filter>
            </div>
            <table className="user_list">
              <thead>
                <tr>
                  <th>編號</th>
                  <th>會員</th>
                  <th>備註</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <UserList
                    userNumber={0}
                    userImg={userImg}
                    userName="Alice"
                    userType="一般"
                  />
                </tr>
                <tr>
                  <td colSpan="4">
                    <hr />
                  </td>
                </tr>
              </tbody>
            </table>

            <span className="total">總共人數：</span>
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          title="新增角色"
          onClose={() => {
            setIsModalOpen(false);
          }}
          shouldCloseOnEsc
          shouldCloseOnClickOutside
          showControlBtn
          cancelBtnText="取消"
          confirmBtnText="新增"
          disabled={charNameValidator !== null}
        >
          <TextInput
            title="角色名稱"
            text={charName}
            showHint={false}
            hintType="ok"
            onChange={(e) => setCharName(e.target.value)}
            required
          />
          <div className="title">角色權限</div>
          <Checkbox
            title="角色權限"
            text="作品集"
            checked={isChecked.indexOf('作品集') !== -1}
            name="char_checkbox"
            onChange={() => {
              handleSelectCheckbox('作品集');
            }}
          />
        </Modal>
      </Layout>
    </div>
  );
};

const mapStateToProps = (store) => ({
  user: store.user,
  editor: store.editor,
});
export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(Admin),
);
