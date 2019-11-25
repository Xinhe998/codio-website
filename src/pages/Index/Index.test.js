/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './index';

import storeFs from '../../reducers';

const store = createStore(storeFs);

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('Home', function () {
  let testComp;

  beforeEach(() => {
    jest.resetModules();

    this.makeSubject = () => {
      testComp = mount(
        <Router>
          <Provider store={store}>
            <Home />
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

    it('should be same as snapshot', async () => {
      const wrapper = render(await testComp);
      expect(wrapper).toMatchSnapshot();
    });

    it('should find three code input boxes for HTML, CSS and JS', async () => {
      expect(testComp.find('.ReactCodeMirror')).toHaveLength(1);
      testComp.find('Tab').at(1).simulate('click');
      expect(testComp.find('.ReactCodeMirror')).toHaveLength(1);
      testComp.find('Tab').at(2).simulate('click');
      expect(testComp.find('.ReactCodeMirror')).toHaveLength(1);
    });
  });
});
