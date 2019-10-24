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
import Checkbox from './index';

import storeFs from '../../reducers';

const store = createStore(storeFs);

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('Checkbox', function () {
  let testComp;

  beforeEach(() => {
    jest.resetModules();
    this.params = {
      text: 'Checkbox',
      checked: false,
      name: 'testCheckbox',
      onChange: jest.fn(),
    };

    this.makeSubject = () => {
      const {
        text, checked, name, onChange,
      } = this.params;

      testComp = mount(
        <Router>
          <Provider store={store}>
            <Checkbox
              text="Checkbox1"
              checked
              name={name}
              onChange={onChange}
            />
            <Checkbox
              text="Checkbox2"
              checked={false}
              name={name}
              onChange={onChange}
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
      expect(testComp.find('.checkbox'));
      expect(testComp.find('.checkMark'));
    });
    // 測試按下會觸發 onChange
    it('test onChange', () => {
      testComp.find('input').at(1).simulate('change', { target: { checked: true } });
      expect(this.params.onChange.mock.calls.length).toEqual(1);
    });
    // 測試是否 render 出 text
    it('test icon', () => {
      expect(testComp.find('.text').first().text()).toEqual('Checkbox1');
    });
  });
});
