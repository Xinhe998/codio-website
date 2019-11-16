import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  useParams,
  useRouteMatch,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { IoMdSearch } from 'react-icons/io';
import action from '../../actions';

import Layout from '../../components/Layout';
import TextInput from '../../components/TextInput';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import ScoreCircle from '../../components/ScoreCircle';

import '../Index/index.scss';
import './index.scss';

import userImg from '../../assets/userImg.png';

const renderPortfolioPage = ({ match }) => {
  const isEditMode = match.params.mode && match.params.mode === 'edit';
  const [userName, setUserName] = useState('Alice');
  const [list, setList] = useState(['會員管理', '圖表分析', '帳戶設定']);
  const { id } = useParams();
  return (
    <Layout userImg={userImg} userName={userName} list={list}>
      <div className="score_circle_wrapper">
        <ScoreCircle score={5} theme="yellow" />
        <ScoreCircle score={6.3} theme="red" />
        <ScoreCircle score={8} theme="blue" />
      </div>
      <div className="edit_portfolio">
        <Button
          className="edit_portfolio_btn"
          text="編輯"
          type="primary"
          size="small"
          theme="red"
        />
      </div>
      {isEditMode ? (
        <TextInput className="project_title" text="My Project" />
      ) : (
        <h1 className="project_title">My Project</h1>
      )}
      <hr />
      <div className="portfolio_tags_wrapper">
        <span className="tag">React</span>
        <span className="tag">Vue.js</span>
      </div>
      <div className="portfolio_desc">
        {isEditMode ? (
          <TextArea
            text="Meracle 憶想奇機是個，其使用 Neurosky
        的頭戴式腦波耳機擷取腦波生理訊號，以量化工作記憶力之演算法得出記憶力指數
        ，並為家長提供豐富多元的圖表及數據分析 。Meracle
        憶想奇機的目標及宗旨在於提升學童的工作記憶力。"
          />
        ) : (
          <React.Fragment>
            Meracle 憶想奇機是個，其使用 Neurosky
            的頭戴式腦波耳機擷取腦波生理訊號，以量化工作記憶力之演算法得出記憶力指數
            ，並為家長提供豐富多元的圖表及數據分析 。Meracle
            憶想奇機的目標及宗旨在於提升學童的工作記憶力。
          </React.Fragment>
        )}
      </div>
      <div className="portfolio_techstack">使用技術：JavaScript</div>
      <div className="portfolio_collaborator">
        <img src={userImg} />
        <img src={userImg} />
        <img src={userImg} />
        <img src={userImg} />
      </div>
      <div className="portfolio_article_wrapper">
        <div className="text_block">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit
        </div>
        <div className="img_block">
          <img src="https://xinhehsu.com/static/meracle-1-b4a9cf768700b3863a8f86d12cd348a5.png" />
        </div>
        <div className="text_block">
          我們的團隊由四個人所組成，利用跨平台行動應用框架React
          Native完成了一套App，以及React.js完成了網頁系統，與ASP.NET API
          2開發後端RESTful
          API。整個專題流程，從發想到實作我都參與其中，尤其在Web前端是由我獨自開發完成。
        </div>
      </div>
    </Layout>
  );
};

const Portfolio = ({ match }) => {
  const { path, url } = useRouteMatch();
  return (
    <div className="Portfolio">
      <Route exact path="/portfolio/:id" component={renderPortfolioPage} />
      <Route
        exact
        path="/portfolio/:id/:mode"
        component={renderPortfolioPage}
      />
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
  )(Portfolio),
);
