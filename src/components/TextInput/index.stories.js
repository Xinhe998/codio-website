import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import StoryRouter from 'storybook-react-router';
import TextInput from './index';
import storeFs from '../../reducers';

const store = createStore(storeFs);
const stories = storiesOf('TextInput', module).addParameters({
  title: 'TextInput',
  component: TextInput,
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

stories.addDecorator(StoryRouter()).add('default', () => (
  <Provider store={store}>
    <TextInput
      title="E-mail"
      text=""
      showHint={false}
      hintType="ok"
      // onChange={e => setEmail(e.target.value)}
      required
    />
  </Provider>
));

stories.addDecorator(StoryRouter()).add('controlled', () => {
  const Parent = ({ children, ...props }) => {
    const [state, setState] = useState([]);
    return <div>{children(state, setState)}</div>;
  };
  return (
    <Parent>
      {(state, setState) => (
        <Provider store={store}>
          <TextInput
            title="E-mail"
            text={state}
            showHint={false}
            hintType="ok"
            onChange={e => setState(e.target.value)}
            required
          />
        </Provider>
      )}
    </Parent>
  );
});
