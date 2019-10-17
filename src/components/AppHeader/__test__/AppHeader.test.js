/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppHeader from '../index';

import storeFs from '../../../reducers';

const store = createStore(storeFs);

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('AppHeader', function() {
  let testComp;
  beforeEach(() => {
    jest.resetModules();
    this.params = {};

    this.makeSubject = () => {
      const {
        currentActiveTab,
        handleTabClick,
        isTabVisible,
        isShareBtnVisible,
      } = this.params;

      testComp = shallow(
        <Router>
          <Provider store={store}>
            <AppHeader
              currentActiveTab="html"
              handleTabClick={() => {}}
              isTabVisible
              isShareBtnVisible
            />
          </Provider>
        </Router>,
      );
      return testComp;
    };
  });
  describe('when it has complete data', () => {
    beforeEach(() => {
      this.params.currentActiveTab = 'html';
      this.subject = this.makeSubject();
    });
    it('should be same as snapshot', async () => {
      const wrapper = render(await testComp);
      expect(wrapper).toMatchSnapshot();
    });
    it('should find div', async () => {
      expect(testComp.find('.AppHeader123'));
    });
    // 測試icon
    // it('should render icon', () => {
    //   expect(testComp.find('img').prop('src')).toEqual(filter);
    // });
    // // 測試text
    // it('should render text', () => {
    //   expect(testComp.find('.Dropdown__button').text()).toEqual('Test:option1');
    // });
    // // 測試按下 button 會觸發 swichOptionHandler
    // it('test click event', () => {
    //   testComp.find('button').simulate('click');
    //   expect(this.params.swichOptionHandler.mock.calls.length).toEqual(1);
    // });
    // 測試按下選項
    // it('test click event', () => {
    //   testComp
    //     .find('.Dropdown__tooltip__list__option')
    //     .at(0)
    //     .simulate('click');
    //   expect(this.params.swichOptionHandler.mock.calls.length).toEqual(1);
    //   expect(this.params.handleClickDispatch.mock.calls.length).toEqual(1);
    // });
  });
});
