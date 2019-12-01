import React, { useState, useRef, createRef, useEffect } from 'react';
import { Route, useParams, useRouteMatch, withRouter } from 'react-router-dom';
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
  history,
  user,
  portfolio,
  project,
  getPortfolioById,
  createPortfolio,
}) => {
  const { id, mode } = useParams();
  const { path, url } = useRouteMatch();

  const isEditMode = mode && mode === 'edit';
  const layoutOptions = [
    { text: '作品集', link: '/homePage' },
    { text: '帳戶設定', link: '/settings' },
  ];
  const [projectTitle, setProjectTitle] = useState(portfolio.mp_name);
  const [projectDesc, setProjectDesc] = useState(portfolio.mp_desc);
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
    setContents(portfolio.contents);
  }, [portfolio]);

  const editContentValueById = (contentId, type, value) => {
    let temp;
    let newC = [];
    contents.map((content) => {
      if (content.content_order !== contentId) {
        temp = content;
      } else {
        temp = {
          mp_no: id,
          m_no: user.m_no,
          content_order: contentId,
          content_type: type,
          work_content: value,
        };
      }
      newC = [...newC, temp];
    });
    setContents(newC);
  };

  const insertNewBlockBelow = (contentId) => {
    let isInserted = false;
    let temp;
    let insertContent;
    let newC = [];
    contents.map((content) => {
      if (!isInserted && content.content_order !== contentId) {
        temp = content;
      } else if (!isInserted && content.content_order === contentId) {
        temp = content;
        insertContent = {
          mp_no: id,
          m_no: user.m_no,
          content_order: contentId + 1,
          content_type: 'text',
          work_content: '',
        };
        isInserted = true;
      } else {
        temp = {
          mp_no: id,
          m_no: user.m_no,
          content_order: content.content_order + 1,
          content_type: content.content_type,
          work_content: content.work_content,
        };
      }
      newC = [...newC, temp];
    });
    newC.splice(contentId, 0, insertContent);
    setContents(newC);
  };

  const focusById = (contentId) => {
    if (elRef[contentId - 1]) elRef[contentId - 1].current.focus();
  };

  const handleSubmit = () => {
    createPortfolio({
      token: user.token,
      mp_no: id,
      data: [
        ...contents,
        {
          mp_no: id,
          m_no: user.m_no,
          content_order: contentsLength + 1,
          content_type: editorCurrentType,
          work_content: editorCurrentValue,
        },
      ],
    });
    history.push(`/portfolio/${id}`);
  };

  return (
    <Layout userImg={dafaulrAvatar} userName={user.m_name} list={layoutOptions}>
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
            onClick={handleSubmit}
          />
        </LayoutBtn>
      )}
      <div className="main_section">
        <div className="portfolio_titlebar">
          {isEditMode ? (
            <TextInput
              className="project_title"
              text={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
          ) : (
            <h1 className="project_title">{projectTitle}</h1>
          )}
          <Like isLiked={false} likeCount={300} />
        </div>
        <hr />
        <div className="portfolio_tags_wrapper">
          {portfolio.mp_hashtag &&
            portfolio.mp_hashtag.split(',').map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
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
            <React.Fragment>{projectDesc}</React.Fragment>
          )}
        </div>
        <div className="portfolio_collaborator">
          <img src={userImg} alt="collaborator" />
          <img src={userImg} alt="collaborator" />
          <img src={userImg} alt="collaborator" />
          <img src={userImg} alt="collaborator" />
        </div>
        <div className="portfolio_article_wrapper">
          {!isEditMode &&
            contentsLength > 0 &&
            contents.map((content) => {
              if (content.content_type === 'text')
                return <div className="text_block">{content.work_content}</div>;
              else if (content.content_type === 'image')
                return (
                  <div className="img_block">
                    <img src={content.work_content} />
                  </div>
                );
            })}
          {isEditMode &&
            contentsLength > 0 &&
            contents.map((content, index) => (
              <ArticleEditors
                key={content.content_order}
                selectedType={content.content_type}
                changeType={(type) => {
                  editContentValueById(
                    content.content_order,
                    type,
                    content.work_content,
                  );
                }}
                value={content.work_content}
                isrenderAddBtn={!content.work_content}
                changeValue={(val) => {
                  editContentValueById(
                    content.content_order,
                    content.content_type,
                    val,
                  );
                }}
                onEnter={() => {
                  insertNewBlockBelow(content.content_order);
                  focusById(content.content_order + 1);
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
                  mp_no: id,
                  m_no: user.m_no,
                  content_order: contentsLength + 1,
                  content_type: editorCurrentType,
                  work_content: editorCurrentValue,
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

export default withRouter(connect(mapStateToProps, action)(Portfolio));
