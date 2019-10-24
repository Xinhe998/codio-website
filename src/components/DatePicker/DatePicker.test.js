/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DatePicker from './index';

import storeFs from '../../reducers';

const store = createStore(storeFs);

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('DatePicker', function() {
  let testComp;

  beforeEach(() => {
    jest.resetModules();
    this.params = {
      defaultDate: new Date('2019/10/25'),
      onSelect: jest.fn(),
      disabledPastDate: true,
      switchHandler: jest.fn(),
    };

    this.makeSubject = () => {
      const {
        defaultDate,
        onSelect,
        disabledPastDate,
        switchHandler,
      } = this.params;

      testComp = shallow(
        <Router>
          <Provider store={store}>
            <DatePicker
              defaultDate={defaultDate}
              onSelect={onSelect}
              disabledPastDate={disabledPastDate}
              switchHandler={switchHandler}
            />
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
    it('should find className', async () => {
      expect(testComp.find('.header'));
    });
  });
});
