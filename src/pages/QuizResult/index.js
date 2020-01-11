import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import action from '../../actions';
import Layout from '../../components/Layout';
import Table from '../../components/Table';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';

import defaultAvatar from '../../assets/default_avatar.jpg';

import './index.scss';

const RenderMemberInTable = ({ user }) => {
  return (
    <div className="member_detail_block">
      <div>
        <div
          className="userinfo"
          style={{
            backgroundImage: `url(${user.m_avatar || defaultAvatar})`,
          }}
        ></div>
      </div>
      <div>
        <span>{user.m_name}</span>
        <span>一般</span>
      </div>
    </div>
  );
};

const Quiz = (props) => {
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  const [scoreData, setScoreData] = useState([]);
  console.log(scoreData);
  const layoutOptions = [
    { text: '作品集', link: '/homepage' },
    { text: '帳號管理', link: '/settings' },
    { text: '測驗管理', link: '/quiz' },
  ];
  const scoreDropdownOptions = ['通過', '未通過', '缺考'];
  const dataSource = [
    {
      id: 1,
      member: (
        <RenderMemberInTable
          user={{
            m_name: 'Alice',
            m_role: '一般',
          }}
        />
      ),
      score: (
        <Select
          options={scoreDropdownOptions}
          isOpen={activeDropdownIndex === 1}
          switchOptionHandler={() =>
            activeDropdownIndex
              ? setActiveDropdownIndex(null)
              : setActiveDropdownIndex(1)
          }
          selectedOption={
            (scoreData &&
              scoreData.filter((data) => {
                return data.m_no === '0000';
              })[0] &&
              scoreData.filter((data) => {
                return data.m_no === '0000';
              })[0].score) ||
            '-'
          }
          setSelectedOption={(text) =>
            setScoreData(
              scoreData.length > 0
                ? [
                    Object.assign(
                      {},
                      scoreData.filter((data) => {
                        return data.m_no === '0000';
                      })[0],
                      { m_no: '0000', member: 'Alice', score: text },
                    ),
                  ]
                : [{ m_no: '0000', member: 'Alice', score: text }],
            )
          }
        />
      ),
      desc: (
        <TextArea
          text={
            (scoreData &&
              scoreData.filter((data) => {
                return data.m_no === '0000';
              })[0] &&
              scoreData.filter((data) => {
                return data.m_no === '0000';
              })[0].desc) ||
            ''
          }
          onChange={(e) =>
            setScoreData(
              scoreData.length > 0
                ? [
                    Object.assign(
                      {},
                      scoreData.filter((data) => {
                        return data.m_no === '0000';
                      })[0],
                      { m_no: '0000', member: 'Alice', desc: e.target.value },
                    ),
                  ]
                : [{ m_no: '0000', member: 'Alice', desc: e.target.value }],
            )
          }
          isAutoSize={false}
        />
      ),
      quiz: <a href="">查看作答</a>,
    },
  ];

  const columns = [
    {
      title: '編號',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '會員',
      dataIndex: 'member',
      key: 'member',
    },
    {
      title: '結果',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: '評語',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '',
      dataIndex: 'quiz',
      key: 'quiz',
    },
  ];
  return (
    <div className="QuizResult">
      <Layout
        userImg={props.user.m_avatar || defaultAvatar}
        userName={props.user.m_name}
        list={layoutOptions}
      >
        <div className="main_section">
          <h2 className="title">測驗</h2>
          <span className="quiz-title">HTML標籤</span>
          <p className="quiz-desc">
            HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤
            HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤HTML標籤
          </p>
          <Table dataSource={dataSource} columns={columns} />
          <div className="save-btn-wrapper">
            <Button
              text="儲存評分"
              type="outline"
              size="small"
              theme="blue"
              className="save_score_btn"
              onClick={() => {}}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

const mapStateToProps = (store) => ({
  user: store.user,
  settings: store.settings,
});
export default withRouter(connect(mapStateToProps, action)(Quiz));
