import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoMdSearch } from 'react-icons/io';
import action from '../../actions';

import Layout from '../../components/Layout';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

import '../Index/index.scss';
import './index.scss';

import userImg from '../../assets/userImg.png';

const Portfolio = () => {
  const [userName, setUserName] = useState('Alice');
  const [list, setList] = useState(['會員管理', '圖表分析', '帳戶設定']);
  return (
    <div className="Portfolio">
      <Layout
        userImg={userImg}
        userName={userName}
        list={list}
      >

      </Layout>
    </div>
  );
};

const mapStateToProps = store => ({
  user: store.user,
  editor: store.editor,
});
export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(Portfolio),
);
