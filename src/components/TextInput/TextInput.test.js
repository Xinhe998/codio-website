/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextInput from './index';

import fakeImg from '../../assets/smartmockups_jxfuqv8i.jpg';
import fakeAvatar from '../../assets/userImg.png';

import storeFs from '../../reducers';

const store = createStore(storeFs);

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('TextInput', function() {
  let testComp;

  beforeEach(() => {
    jest.resetModules();
    this.params = {
      type: 'text',
      placeholder: 'Test Placeholder',
      text: 'Test',
      title: 'TextInput',
      onChange: jest.fn(),
      required: false,
      showHint: false,
      hintType: 'ok',
      hintText: '',
      onFocus: jest.fn(),
      onBlur: jest.fn(),
      disabled: false,
      icon: '',
      showPostBtn: false,
      postBtnText: '',
      postBtnOnClick: jest.fn(),
      readonly: false,
    };

    this.makeSubject = () => {
      const {
        type,
        placeholder,
        text,
        title,
        onChange,
        required,
        showHint,
        hintType,
        hintText,
        onFocus,
        onBlur,
        disabled,
        icon,
        showPostBtn,
        postBtnText,
        postBtnOnClick,
        readonly,
      } = this.params;

      testComp = shallow(
        <Router>
          <Provider store={store}>
            <TextInput
              title={title}
              type={type}
              placeholder={placeholder}
              text={text}
              onChange={onChange}
              required={required}
              showHint={showHint}
              hintType={hintType}
              hintText={hintText}
              onFocus={onFocus}
              onBlur={onBlur}
              disabled={disabled}
              icon={icon}
              showPostBtn={showPostBtn}
              postBtnText={postBtnText}
              postBtnOnClick={postBtnOnClick}
              readonly={readonly}
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
  });
});
