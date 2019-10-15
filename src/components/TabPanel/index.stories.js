import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import StoryRouter from 'storybook-react-router';
import TabPanel from './index';
import storeFs from '../../reducers';

const store = createStore(storeFs);
const stories = storiesOf('TabPanel', module).addParameters({
  title: 'TabPanel',
  component: TabPanel,
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

stories.addDecorator(StoryRouter()).add('default', () => (
  <Provider store={store}>
    <TabPanel selected>Tab 1 Content</TabPanel>
    <TabPanel selected={false}>Tab 2 Content</TabPanel>
  </Provider>
));
