import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import StoryRouter from 'storybook-react-router';
import Modal from './index';
import storeFs from '../../reducers';

const store = createStore(storeFs);
const stories = storiesOf('Modal', module).addParameters({
  title: 'Modal',
  component: Modal,
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

stories.addDecorator(StoryRouter()).add('default', () => (
  <Provider store={store}>
    <Modal
      isOpen
      title="My PopUp Modal"
      onClose={() => {}}
      shouldCloseOnEsc
      shouldCloseOnClickOutside
      showControlBtn={false}
    >
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </Modal>
  </Provider>
));

stories.addDecorator(StoryRouter()).add('顯示control buttons', () => (
  <Provider store={store}>
    <Modal
      isOpen
      title="My PopUp Modal"
      onClose={() => {}}
      shouldCloseOnEsc
      shouldCloseOnClickOutside
      showControlBtn
      confirmBtnText="確定"
      cancelBtnText="取消"
    >
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </Modal>
  </Provider>
));
