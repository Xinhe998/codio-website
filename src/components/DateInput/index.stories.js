import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';
import DateInput from './index';
import storeFs from '../../reducers';

const store = createStore(storeFs);
const stories = storiesOf('DateInput', module);

stories.addDecorator(StoryRouter()).add('default', () => (
  <Provider store={store}>
    <DateInput
      title="日期"
      placeholder="dd/mm/yyyy"
      defaultDate={new Date()}
      // onSelect={setBirth}
      disabledPastDate={false}
      isOpenDatePicker
      // onFocus={() => setIsBirthOnFocus(true)}
      // switchHandler={setIsBirthOnFocus}
      required
      // onBlur={() => setIsBirthOnFocus(false)}
    />
  </Provider>
));
