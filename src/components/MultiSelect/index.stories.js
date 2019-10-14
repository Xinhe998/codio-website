import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import StoryRouter from 'storybook-react-router';
import MultiSelect from './index';
import storeFs from '../../reducers';

const store = createStore(storeFs);
const stories = storiesOf('MultiSelect', module).addParameters({
  title: 'MultiSelect',
  component: MultiSelect,
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

const fakeOptions = ['React', 'Vue', 'Angular', 'jQuery', 'CSS', 'HTML'];

stories.addDecorator(StoryRouter()).add('default', () => {
  const Parent = ({ children, ...props }) => {
    const [projectTags, setProjectTags] = useState([]);
    return <div>{children(projectTags, setProjectTags)}</div>;
  };
  return (
    <Parent>
      {(projectTags, setProjectTags) => (
        <Provider store={store}>
          <MultiSelect
            title="類別"
            options={fakeOptions}
            selectedItems={projectTags}
            onChange={setProjectTags}
          />
        </Provider>
      )}
    </Parent>
  );
});
