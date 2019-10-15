import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import StoryRouter from 'storybook-react-router';
import RadioButtonGroup from './index';
import storeFs from '../../reducers';

const store = createStore(storeFs);
const stories = storiesOf('RadioButtonGroup', module).addParameters({
  title: 'RadioButtonGroup',
  component: RadioButtonGroup,
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

const fakeOptions = ['Option 1', 'Option 2'];

stories.addDecorator(StoryRouter()).add('default', () => (
  <Provider store={store}>
    <RadioButtonGroup
      name="my_radio_group"
      title="Radio Button Group"
      options={fakeOptions}
      value="Option 1"
      required
    />
  </Provider>
));

stories.addDecorator(StoryRouter()).add('controlled', () => {
  const Parent = ({ children, ...props }) => {
    const [state, setState] = useState('Option 1');
    return <div>{children(state, setState)}</div>;
  };
  return (
    <Parent>
      {(state, setState) => (
        <Provider store={store}>
          <RadioButtonGroup
            name="my_radio_group"
            title="Radio Button Group"
            options={fakeOptions}
            value={state}
            onChange={setState}
            required
          />
        </Provider>
      )}
    </Parent>
  );
});
