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
import DateInput from './index';

import storeFs from '../../reducers';

const store = createStore(storeFs);

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('DateInput', function () {
  let testComp;

  beforeEach(() => {
    jest.resetModules();
    this.params = {
      defaultDate: new Date('2019/10/24'),
      onSelect: jest.fn(),
      disabledPastDate: true,
      title: 'DateInput',
      placeholder: 'DateInput_Placeholder',
      isOpenDatePicker: false,
      onFocus: jest.fn(),
      onBlur: jest.fn(),
      switchHandler: jest.fn(),
      required: true,
    };

    this.makeSubject = () => {
      const {
        defaultDate,
        onSelect,
        disabledPastDate,
        title,
        placeholder,
        isOpenDatePicker,
        onFocus,
        onBlur,
        switchHandler,
        required,
      } = this.params;

      testComp = mount(
        <Router>
          <Provider store={store}>
            <DateInput
              defaultDate={defaultDate}
              onSelect={onSelect}
              disabledPastDate={disabledPastDate}
              title={title}
              placeholder={placeholder}
              isOpenDatePicker={isOpenDatePicker}
              onFocus={onFocus}
              onBlur={onBlur}
              switchHandler={switchHandler}
              required={required}
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
    it('should be same as snapshot', async () => {
      const wrapper = render(await testComp);
      expect(wrapper).toMatchSnapshot();
    });
    it('should find className', async () => {
      expect(testComp.find('.DateInput'));
    });
    // 測試按下會觸發 onChange
    it('test onChange', () => {
      testComp.setProps({ isOpenDatePicker: true });
      testComp.update();
      expect(testComp.find('DatePicker'));
    });
  });
});
