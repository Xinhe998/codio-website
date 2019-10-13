import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoMdSearch } from 'react-icons/io';
import action from '../actions';

import AppHeader from '../components/AppHeader';
import TextInput from '../components/TextInput';
import ProjectCard from '../components/ProjectCard';
import Button from '../components/Button';

import './index.scss';
import './Search.scss';

import mockup from '../assets/smartmockups_jxfuqv8i.jpg';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <div className="Search">
      <AppHeader isTabVisible={false} isShareBtnVisible={false} />
      <div className="SearchContent">
        <div className="banner">
          <TextInput
            placeholder="搜尋專案、類別、開發者"
            text={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <Button
            type="primary"
            size="small"
            icon={<IoMdSearch />}
            theme="red"
            shape="square"
          />
        </div>
        <h2>本週排行</h2>
        <div className="projectList">
          <ProjectCard
            title="todolist"
            img={mockup}
            avatar="https://avatars3.githubusercontent.com/u/29070256?s=460&v=4"
            viewCount="1300"
            likeCount="560"
            showPlace
            place="1"
          />
          <ProjectCard
            title="todolist"
            img={mockup}
            avatar="https://avatars2.githubusercontent.com/u/45359728?s=460&v=4"
            viewCount="1300"
            likeCount="560"
            showPlace
            place="2"
          />
          <ProjectCard
            title="todolist"
            img={mockup}
            avatar="https://avatars2.githubusercontent.com/u/45359728?s=460&v=4"
            viewCount="1300"
            likeCount="560"
            showPlace
            place="3"
          />
        </div>
        <h2>已追蹤</h2>
        <div className="projectList">
          <ProjectCard
            title="todolist"
            img={mockup}
            avatar="https://avatars3.githubusercontent.com/u/29070256?s=460&v=4"
            viewCount="1300"
            likeCount="560"
          />
          <ProjectCard
            title="todolist"
            img={mockup}
            avatar="https://avatars3.githubusercontent.com/u/29070256?s=460&v=4"
            viewCount="1300"
            likeCount="560"
          />
          <ProjectCard
            title="todolist"
            img={mockup}
            avatar="https://avatars3.githubusercontent.com/u/29070256?s=460&v=4"
            viewCount="1300"
            likeCount="560"
          />
        </div>
        <h2 />
        <div className="projectList">
          <ProjectCard
            title="todolist"
            img={mockup}
            avatar="https://avatars3.githubusercontent.com/u/29070256?s=460&v=4"
            viewCount="1300"
            likeCount="560"
          />
          <ProjectCard
            title="todolist"
            img={mockup}
            avatar="https://avatars3.githubusercontent.com/u/29070256?s=460&v=4"
            viewCount="1300"
            likeCount="560"
          />
          <ProjectCard
            title="todolist"
            img={mockup}
            avatar="https://avatars3.githubusercontent.com/u/29070256?s=460&v=4"
            viewCount="1300"
            likeCount="560"
          />
        </div>
      </div>
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
  )(Search),
);
