import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';
import { IoMdSearch } from 'react-icons/io';
import Button from './index';
import storeFs from '../../reducers';

const store = createStore(storeFs);
const stories = storiesOf('Button', module);

stories.addDecorator(StoryRouter()).add('type: primary', () => (
  <Provider store={store}>
    <Button
      className="my_btn"
      text="Button"
      type="primary"
      size="small"
      onClick={action('clicked')}
      disabled={false}
    />
  </Provider>
));

stories.addDecorator(StoryRouter()).add('type: outline', () => (
  <Provider store={store}>
    <Button
      className="my_btn"
      text="Button"
      type="outline"
      size="small"
      onClick={action('clicked')}
      disabled={false}
    />
  </Provider>
));

stories.addDecorator(StoryRouter()).add('type: link', () => (
  <Provider store={store}>
    <Button
      className="my_btn"
      text="Button"
      type="link"
      onClick={action('clicked')}
      disabled={false}
    />
  </Provider>
));

stories.addDecorator(StoryRouter()).add('size: large', () => (
  <Provider store={store}>
    <Button
      className="my_btn"
      text="Button"
      type="primary"
      size="large"
      onClick={action('clicked')}
      disabled={false}
    />
  </Provider>
));

stories.addDecorator(StoryRouter()).add('theme: red', () => (
  <Provider store={store}>
    <Button
      className="my_btn"
      text="Button"
      type="primary"
      size="large"
      theme="red"
      onClick={action('clicked')}
      disabled={false}
    />
  </Provider>
));

stories.addDecorator(StoryRouter()).add('disabled', () => (
  <Provider store={store}>
    <Button
      className="my_btn"
      text="Button"
      type="primary"
      size="large"
      onClick={action('clicked')}
      disabled
    />
  </Provider>
));

stories.addDecorator(StoryRouter()).add('shape: square', () => (
  <Provider store={store}>
    <Button
      className="my_btn"
      type="primary"
      size="large"
      onClick={action('clicked')}
      icon={<IoMdSearch />}
      shape="square"
      disabled={false}
    />
  </Provider>
));
