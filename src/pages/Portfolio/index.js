import React, { useState, useRef, createRef } from 'react';
import {
  BrowserRouter as Router,
  Route,
  useParams,
  useRouteMatch,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import action from '../../actions';

import Layout from '../../components/Layout';
import TextInput from '../../components/TextInput';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import ScoreCircle from '../../components/ScoreCircle';
import ArticleEditors from '../../components/ArticleEditors';

import '../Index/index.scss';
import './index.scss';

import userImg from '../../assets/userImg.png';

const renderPortfolioPage = ({ match }) => {
  const isEditMode = match.params.mode && match.params.mode === 'edit';
  const [userName, setUserName] = useState('Alice');
  const [list, setList] = useState(['會員管理', '圖表分析', '帳戶設定']);
  const [projectDesc, setProjectDesc] = useState(
    'Meracle 憶想奇機是個，其使用 Neurosky的頭戴式腦波耳機擷取腦波生理訊號，以量化工作記憶力之演算法得出記憶力指數，並為家長提供豐富多元的圖表及數據分析 。Meracle憶想奇機的目標及宗旨在於提升學童的工作記憶力。',
  );
  const [editorCurrentType, setEditorCurrentType] = useState('text');
  const [editorCurrentValue, setEditorCurrentValue] = useState('');
  const [contents, setContents] = useState([]);
  const contentsLength = Object.keys(contents).length;

  const elRef = React.useMemo(
    () => Array.from(contents, () => React.createRef()),
    [contentsLength],
  );
  const newBlockRef = useRef();

  const { id } = useParams();

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
      <div className="portfolio_techstack">使用技術：JavaScript</div>
      <div className="portfolio_collaborator">
        <img src={userImg} alt="collaborator" />
        <img src={userImg} alt="collaborator" />
        <img src={userImg} alt="collaborator" />
        <img src={userImg} alt="collaborator" />
      </div>
      <div className="portfolio_article_wrapper">
        {/* <div className="text_block">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit
        </div>
        <div className="img_block">
          <img src="https://xinhehsu.com/static/meracle-1-b4a9cf768700b3863a8f86d12cd348a5.png" />
        </div> */}

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
