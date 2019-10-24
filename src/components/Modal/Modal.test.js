/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, configure, render, mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import Adapter from 'enzyme-adapter-react-16';
import Modal from './index';

import storeFs from '../../reducers';

const store = createStore(storeFs);

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('Modal', function() {
  let testComp;

  beforeEach(() => {
    jest.resetModules();
    this.params = {
      isOpen: true,
      title: 'TestModal',
      shouldCloseOnEsc: true,
      shouldCloseOnClickOutside: true,
      showControlBtn: true,
      cancelBtnText: '取消',
      confirmBtnText: '確認',
      disabled: false,
      onClose: jest.fn(),
      Confirm: jest.fn(),
      children: <h1>Test</h1>,
      history: createMemoryHistory('/'),
      className: 'TestModal',
    };

    this.makeSubject = () => {
      const {
        isOpen,
        title,
        shouldCloseOnEsc,
        shouldCloseOnClickOutside,
        showControlBtn,
        cancelBtnText,
        confirmBtnText,
        disabled,
        onClose,
        Confirm,
        children,
        history,
        className,
      } = this.params;

      testComp = shallow(
        <Router>
          <Provider store={store}>
            <Modal
              isOpen={isOpen}
              title={title}
              shouldCloseOnEsc={shouldCloseOnEsc}
              shouldCloseOnClickOutside={shouldCloseOnClickOutside}
              showControlBtn={showControlBtn}
              cancelBtnText={cancelBtnText}
              confirmBtnText={confirmBtnText}
              disabled={disabled}
              onClose={onClose}
              Confirm={Confirm}
              history={history}
              className={className}
            >
              {children}
            </Modal>
          </Provider>
        </Router>,
      );
      return testComp;
    };
  });
  describe('when it has complete data', () => {
    beforeEach(() => {
      this.subject = this.makeSubject();
    });
    it('should be same as snapshot', async () => {
      const wrapper = render(await testComp);
      expect(wrapper).toMatchSnapshot();
    });
    it('should find className', async () => {
      expect(testComp.find('.Modal'));
      expect(testComp.find('.TestModal'));
    });
  });
});
