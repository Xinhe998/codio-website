/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  shallow, configure, render, mount,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConsoleBox from './index';

import storeFs from '../../reducers';

const store = createStore(storeFs);

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('ConsoleBox', function () {
  let testComp;

  beforeEach(() => {
    jest.resetModules();
    this.params = {};

    this.makeSubject = () => {
      testComp = mount(
        <Router>
          <Provider store={store}>
            <ConsoleBox />
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
      expect(testComp.find('.console-box'));
    });
  });
});
