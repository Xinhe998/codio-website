import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import StoryRouter from 'storybook-react-router';
import ProjectCard from './index';
import storeFs from '../../reducers';

import mockup from '../../assets/smartmockups_jxfuqv8i.jpg';

const store = createStore(storeFs);
const stories = storiesOf('ProjectCard', module).addParameters({
  title: 'ProjectCard',
  component: ProjectCard,
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

stories.addDecorator(StoryRouter()).add('default', () => (
  <Provider store={store}>
    <ProjectCard
      title="todolist"
      img={mockup}
      avatar="https://avatars3.githubusercontent.com/u/29070256?s=460&v=4"
      viewCount="1300"
      likeCount="560"
    />
  </Provider>
));

stories.addDecorator(StoryRouter()).add('顯示名次', () => (
  <Provider store={store}>
    <ProjectCard
      title="todolist"
      img={mockup}
      avatar="https://avatars3.githubusercontent.com/u/29070256?s=460&v=4"
      viewCount="1300"
      likeCount="560"
      showPlace
      place="1"
    />
  </Provider>
));
