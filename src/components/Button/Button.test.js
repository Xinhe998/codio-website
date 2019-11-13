/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FaAirbnb } from 'react-icons/fa';
import Button from './index';

import storeFs from '../../reducers';

const store = createStore(storeFs);

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('Button', function() {
  let testComp;

  beforeEach(() => {
    jest.resetModules();
    this.params = {
      text: 'Button',
      size: 'small',
      type: 'primary',
      shape: 'square',
      onClick: jest.fn(),
      disabled: false,
      className: 'testBtn',
      theme: 'blue',
      icon: <FaAirbnb />,
    };

    this.makeSubject = () => {
      const {
        text,
        size,
        type,
        shape,
        onClick,
        disabled,
        className,
        theme,
        icon,
      } = this.params;

      testComp = mount(
        <Router>
          <Provider store={store}>
            <Button
              text={text}
              size={size}
              type={type}
              shape={shape}
              onClick={onClick}
              disabled={disabled}
              className={className}
              theme={theme}
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
      expect(testComp.find('.testBtn'));
      expect(testComp.find('.shape_square'));
      expect(testComp.find('.type_primary'));
      expect(testComp.find('.theme_blue'));
    });
    // 測試按下會觸發 onClick
    it('test onClick', () => {
      testComp.simulate('click');
      expect(this.params.onClick.mock.calls.length).toEqual(1);
    });
    // 測試是否 render 出 icon
    it('test icon', () => {
      expect(testComp.find('FaAirbnb')).toHaveLength(1);
    });
    // 測試是否 render 出 text
    it('test icon', () => {
      expect(testComp.text()).toEqual('Button');
    });
  });
});
