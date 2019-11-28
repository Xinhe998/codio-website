import React, { useState, useRef, createRef, useEffect } from 'react';
import {
  Route,
  useParams,
  useRouteMatch,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import action from '../../actions';

import Layout from '../../components/Layout';
import LayoutBtn from '../../components/LayoutBtn';
import TextInput from '../../components/TextInput';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import ScoreCircle from '../../components/ScoreCircle';
import ArticleEditors from '../../components/ArticleEditors';
import Like from '../../components/Like';

import '../Index/index.scss';
import './index.scss';

import userImg from '../../assets/userImg.png';
import dafaulrAvatar from '../../assets/default_avatar.jpg';

const RenderPortfolioPage = ({
  match,
  history,
  user,
  portfolio,
  project,
  getPortfolioById,
  createPortfolio,
}) => {
  const { id } = useParams();
  const { path, url } = useRouteMatch();

  const isEditMode = match.params.mode && match.params.mode === 'edit';
  const [userName, setUserName] = useState('Alice');
  const [list, setList] = useState(['會員管理', '圖表分析', '帳戶設定']);
  const [projectDesc, setProjectDesc] = useState(
    'Meracle 憶想奇機是個，其使用 Neurosky的頭戴式腦波耳機擷取腦波生理訊號，以量化工作記憶力之演算法得出記憶力指數，並為家長提供豐富多元的圖表及數據分析 。Meracle憶想奇機的目標及宗旨在於提升學童的工作記憶力。',
  );
  const [editorCurrentType, setEditorCurrentType] = useState('text');
  const [editorCurrentValue, setEditorCurrentValue] = useState('');
  const [contents, setContents] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const contentsLength = Object.keys(contents).length;

  const elRef = React.useMemo(
    () => Array.from(contents, () => React.createRef()),
    [contentsLength],
  );
  const newBlockRef = useRef();

  useEffect(() => {
    getPortfolioById({
      token: user.token,
      mp_no: id,
    });
  }, []);

  useEffect(() => {
    setContents(portfolio);
  }, [portfolio]);

  const editContentValueById = (id, type, value) => {
    let temp;
    let newC = [];
    contents.map((content) => {
      if (content.id !== id) {
        temp = content;
      } else {
        temp = { id, type, value };
      }
      newC = [...newC, temp];
    });
    setContents(newC);
  };

  const insertNewBlockBelow = (id) => {
    let isInserted = false;
    let temp;
    let insertContent;
    let newC = [];
    contents.map((content) => {
      if (!isInserted && content.id !== id) {
        temp = content;
      } else if (!isInserted && content.id === id) {
        temp = content;
        insertContent = { id: id + 1, type: 'text', value: '' };
        isInserted = true;
      } else {
        temp = { id: content.id + 1, type: content.type, value: content.value };
      }
      newC = [...newC, temp];
    });
    newC.splice(id, 0, insertContent);
    setContents(newC);
  };

  const focusById = (id) => {
    elRef[id - 1].current.focus();
  };

  console.log(contents);

  return (
    <Layout userImg={dafaulrAvatar} userName={user.m_name} list={list}>
      <div className="score_circle_wrapper">
        <ScoreCircle score={5} theme="yellow" text="介面很美" />
        <ScoreCircle score={6.3} theme="red" text="程式碼好閱讀" />
        <ScoreCircle score={8} theme="blue" text="很有創意" />
      </div>
      {!isEditMode ? (
        <LayoutBtn>
          <Button
            className="edit_portfolio_btn"
            text="編輯"
            type="primary"
            size="small"
            theme="red"
            onClick={() => {
              history.push(`${url}/edit`);
            }}
          />
        </LayoutBtn>
      ) : (
        <LayoutBtn>
          <Button
            className="edit_portfolio_btn"
            text="儲存"
            type="primary"
            size="small"
            theme="red"
            onClick={() => {
              // createPortfolio({
              //   mp_no: id,
              //   Data: 
              // });
              history.push(`/portfolio/${id}`);
            }}
          />
        </LayoutBtn>
      )}
      <div className="main_section">
        <div className="portfolio_titlebar">
          {isEditMode ? (
            <TextInput className="project_title" text="My Project" />
          ) : (
            <h1 className="project_title">{'Xinhe'}</h1>
          )}
          <Like isLiked={false} likeCount={300} />
        </div>
        <hr />
        <div className="portfolio_tags_wrapper">
          <span className="tag">React</span>
          <span className="tag">Vue.js</span>
        </div>
        <div className="portfolio_desc">
          {isEditMode ? (
            <TextArea
              text={projectDesc}
              onChange={(e) => {
                setProjectDesc(e.target.value);
              }}
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
        <div className="portfolio_collaborator">
          <img src={userImg} alt="collaborator" />
          <img src={userImg} alt="collaborator" />
          <img src={userImg} alt="collaborator" />
          <img src={userImg} alt="collaborator" />
        </div>
        <div className="portfolio_article_wrapper">
          {isEditMode &&
            contentsLength > 0 &&
            contents.map((content, index) => (
              <ArticleEditors
                key={content.id}
                selectedType={content.type}
                changeType={(type) => {
                  editContentValueById(content.id, type, content.value);
                }}
                value={content.value}
                isrenderAddBtn={!content.value}
                changeValue={(val) => {
                  editContentValueById(content.id, content.type, val);
                }}
                onEnter={() => {
                  insertNewBlockBelow(content.id);
                  focusById(content.id + 1);
                }}
                textRef={elRef[index]}
              />
            ))}

          {isEditMode && (
            <ArticleEditors
              key="ArticleEditors_new"
              className="new_content"
              selectedType={editorCurrentType}
              changeType={(type) => setEditorCurrentType(type)}
              value={editorCurrentValue}
              isrenderAddBtn
              changeValue={(val) => {
                setEditorCurrentValue(val);
              }}
              onEnter={() => {
                let newContent = {};
                newContent = {
                  id: contentsLength + 1,
                  type: editorCurrentType,
                  value: editorCurrentValue,
                };
                setContents([...contents, newContent]);
                setEditorCurrentType('text');
                setEditorCurrentValue('');
                if (newBlockRef.current) {
                  newBlockRef.current.focus();
                } else {
                  setTimeout(() => {
                    if (newBlockRef.current) {
                      newBlockRef.current.focus();
                    }
                  }, 100);
                }
              }}
              textRef={newBlockRef}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

const Portfolio = (props) => {
  return (
    <div className="Portfolio">
      <Route
        exact
        {...props}
        path="/portfolio/:id"
        render={() => <RenderPortfolioPage {...props} />}
        history={props.history}
      />
      <Route
        exact
        {...props}
        path="/portfolio/:id/:mode"
        render={() => <RenderPortfolioPage {...props} />}
        history={props.history}
      />
    </div>
  );
};

const mapStateToProps = (store) => ({
  user: store.user,
  project: store.project,
  portfolio: store.portfolio,
});

export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(Portfolio),
);
