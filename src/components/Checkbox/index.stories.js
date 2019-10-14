import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';
import Checkbox from './index';
import storeFs from '../../reducers';

const store = createStore(storeFs);
const stories = storiesOf('Checkbox', module);

stories.addDecorator(StoryRouter()).add('default', () => (
  <Provider store={store}>
    <Checkbox
      name="myCheckbox"
      checked={false}
    />
  </Provider>
));

stories.addDecorator(StoryRouter()).add('checked', () => (
  <Provider store={store}>
    <Checkbox
      name="myCheckbox"
      checked
    />
  </Provider>
));
