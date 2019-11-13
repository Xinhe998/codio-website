import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import StoryRouter from 'storybook-react-router';
import Resizer from './index';
import storeFs from '../../reducers';

const store = createStore(storeFs);
const stories = storiesOf('Resizer', module).addParameters({
  title: 'Resizer',
  component: Resizer,
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

let elementWidth = 200;

stories.addDecorator(StoryRouter()).add('default', () => (
  <Provider store={store}>
    <Resizer
      direction="x"
    >
      <div
        style={{
          height: '150px',
          backgroundColor: '#f0f0f0',
        }}
      >
        Resize Me
      </div>
    </Resizer>
  </Provider>
));
