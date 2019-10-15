import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import StoryRouter from 'storybook-react-router';
import SearchAlert from './index';
import storeFs from '../../reducers';

const store = createStore(storeFs);
const stories = storiesOf('SearchAlert', module).addParameters({
  title: 'SearchAlert',
  component: SearchAlert,
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

stories.addDecorator(StoryRouter()).add('default', () => (
  <Provider store={store}>
    <SearchAlert text="This is Search Alert" />
  </Provider>
));
