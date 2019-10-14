import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import AppHeader from './index';
import storeFs from '../../reducers';

const store = createStore(storeFs);
const stories = storiesOf('AppHeader', module).addParameters({
  title: 'AppHeader',
  component: AppHeader,
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

stories.addDecorator(StoryRouter()).addParameters({ foo: 1 }).add('顯示Tab', () => (
  <Provider store={store}>
    <AppHeader
      currentActiveTab="html"
      handleTabClick={action('clicked')}
      isTabVisible
      isShareBtnVisible
    />
  </Provider>
));

stories.addDecorator(StoryRouter()).add('不顯示Tab', () => (
  <Provider store={store}>
    <AppHeader
      currentActiveTab="html"
      handleTabClick={action('clicked')}
      isTabVisible={false}
      isShareBtnVisible
    />
  </Provider>
));

stories.addDecorator(StoryRouter()).add('不顯示分享按鈕', () => (
  <Provider store={store}>
    <AppHeader
      currentActiveTab="html"
      handleTabClick={action('clicked')}
      isTabVisible={false}
      isShareBtnVisible={false}
    />
  </Provider>
));
