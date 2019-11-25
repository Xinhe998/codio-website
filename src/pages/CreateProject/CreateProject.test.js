/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateProject from './index';

import storeFs from '../../reducers';

const store = createStore(storeFs);

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('CreateProject', function () {
  let testComp;

  beforeEach(() => {
    jest.resetModules();

    this.makeSubject = () => {
      testComp = mount(
        <Router>
          <Provider store={store}>
            <CreateProject />
          </Provider>
        </Router>,
      );
      return testComp;
    };
  });
  describe('when it has complete data', () => {
    beforeEach(() => {
      store.dispatch = jest.fn();
      this.subject = this.makeSubject();
    });

    it('find div', async () => {
      expect(testComp.find('.CreateProjectModal'));
    });
  });
});
