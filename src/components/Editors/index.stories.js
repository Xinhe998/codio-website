import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { themes } from '@storybook/theming';
import { action } from '@storybook/addon-actions';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import StoryRouter from 'storybook-react-router';
import Editors from './index';
import storeFs from '../../reducers';

const store = createStore(storeFs);
const stories = storiesOf('Editors', module).addParameters({
  title: 'Editors',
  component: Editors,
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

stories.addDecorator(StoryRouter()).add('default', () => (
  <Provider store={store}>
    <Editors currentActiveTab="html" />
  </Provider>
));
