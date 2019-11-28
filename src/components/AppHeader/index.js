import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import TabList from '../TabList';
import Tab from '../Tab';
import UserInfo from './UserInfo';
import logo from '../../assets/codio_logo.png';
import Modal from '../Modal';
import TextInput from '../TextInput';
import RadioButtonGroup from '../RadioButtonGroup';
import { MdShare } from 'react-icons/md';
import './index.scss';

const AppHeader = ({
  currentActiveTab,
  handleTabClick,
  isTabVisible,
  isShareBtnVisible,
  isUserBtnVisible,
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [permission, setPermission] = useState('編輯');
  const permissionOptions = ['編輯', '檢視'];
  const ShareUrlInputRef = useRef();
  return (
    <header className="AppHeader">
      <div className="AppHeader__logo-wrap">
        <img className="codio_logo" src={logo} alt="codio_logo" />
      </div>
      {isTabVisible ? (
        <TabList className="AppHeader__tablist">
          <Tab
            selected={currentActiveTab === 'html'}
            tabIndex="0"
            handleTabClick={() => handleTabClick('html')}
          >
            HTML
          </Tab>
          <Tab
            selected={currentActiveTab === 'css'}
            tabIndex="1"
            handleTabClick={() => handleTabClick('css')}
          >
            CSS
          </Tab>
          <Tab
            selected={currentActiveTab === 'js'}
            tabIndex="2"
            handleTabClick={() => handleTabClick('js')}
          >
            JS
          </Tab>
          <Tab
            selected={currentActiveTab === 'logs'}
            tabIndex="3"
            handleTabClick={() => handleTabClick('logs')}
          >
            Console
          </Tab>
        </TabList>
      ) : null}
      <div className="AppHeader__btnGroup">
        {isShareBtnVisible ? (
          <MdShare
            className="shareBtn"
            onClick={() => setIsShareModalOpen(true)}
          />
        ) : null}
        {isShareBtnVisible ? (
          <Modal
            isOpen={isShareModalOpen}
            className="shareModal"
            title="與他人共用"
            onClose={() => setIsShareModalOpen(false)}
            shouldCloseOnEsc
            shouldCloseOnClickOutside
            showControlBtn
            confirmBtnText="儲存"
            cancelBtnText="取消"
          >
            <TextInput
              text="http://www.qwertyuiopzjqwmdhsuabxsjx.."
              showPostBtn
              postBtnText="複製連結"
              ref={ShareUrlInputRef}
              postBtnOnClick={() => {
                ShareUrlInputRef.current.select();
                document.execCommand('copy');
              }}
              readonly
            />
            <p>知道連結的人可以</p>
            <RadioButtonGroup
              name="permission"
              options={permissionOptions}
              value={permission}
              onChange={setPermission}
            />
          </Modal>
        ) : null}
        {isUserBtnVisible && <UserInfo />}
      </div>
    </header>
  );
};

AppHeader.propTypes = {
  currentActiveTab: PropTypes.string,
  handleTabClick: PropTypes.func,
  isTabVisible: PropTypes.bool,
  isShareBtnVisible: PropTypes.bool,
  isUserBtnVisible: PropTypes.bool,
};

AppHeader.defaultProps = {
  currentActiveTab: 'html',
  isTabVisible: false,
  isShareBtnVisible: false,
  isUserBtnVisible: true,
};

export default AppHeader;
