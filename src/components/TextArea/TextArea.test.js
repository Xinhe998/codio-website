/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextArea from './index';

import fakeImg from '../../assets/smartmockups_jxfuqv8i.jpg';
import fakeAvatar from '../../assets/userImg.png';

import storeFs from '../../reducers';

const store = createStore(storeFs);

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('TextArea', function() {
  let testComp;

  beforeEach(() => {
    jest.resetModules();
    this.params = {
      placeholder: 'Test',
      text: 'Test',
      title: 'TextArea',
      onChange: jest.fn(),
      required: false,
      onFocus: jest.fn(),
      onBlur: jest.fn(),
      icon: '',
    };

    this.makeSubject = () => {
      const {
        placeholder,
        text,
        title,
        onChange,
        required,
        onFocus,
        onBlur,
        icon,
      } = this.params;

      testComp = mount(
        <Router>
          <Provider store={store}>
            <TextArea
              placeholder={placeholder}
              text={text}
              title={title}
              onChange={onChange}
              required={required}
              onFocus={onFocus}
              onBlur={onBlur}
              icon={icon}
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
      expect(testComp.find('.textinput'));
    });
    it('test text', async () => {
      expect(testComp.find('.textinput__title').text()).toEqual('TextArea');
    });
    it('test onFocus', async () => {
      testComp.find('.textarea').first().simulate('focus');
      expect(this.params.onFocus.mock.calls.length).toEqual(1);
    });
    it('test onChange', async () => {
      testComp.find('.textarea').simulate('change', { target: { value: 'Test!!!' } });
      expect(this.params.onChange.mock.calls.length).toEqual(1);
    });
  });
});
