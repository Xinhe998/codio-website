/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppHeader from './index';

import storeFs from '../../reducers';

import userInfoImg from '../../assets/user-solid.svg';

const store = createStore(storeFs);

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('AppHeader', function() {
  let testComp;

  beforeEach(() => {
    jest.resetModules();
    this.params = {
      currentActiveTab: 'html',
      handleTabClick: jest.fn(),
      isTabVisible: true,
      isShareBtnVisible: true,
      isUserBtnVisible: true,
    };

    this.makeSubject = () => {
      const {
        currentActiveTab,
        handleTabClick,
        isTabVisible,
        isShareBtnVisible,
        isUserBtnVisible,
      } = this.params;

      testComp = mount(
        <Router>
          <Provider store={store}>
            <AppHeader
              currentActiveTab={currentActiveTab}
              handleTabClick={handleTabClick}
              isTabVisible={isTabVisible}
              isShareBtnVisible={isShareBtnVisible}
              isUserBtnVisible={isUserBtnVisible}
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
      expect(testComp.find('.AppHeader'));
    });
    // 測試 ShareBtn，按下會打開 Modal
    it('should render ShareBtn icon', () => {
      expect(testComp.find('.shareBtn'));
      testComp.find('.shareBtn').first().simulate('click');
      expect(testComp.find('.shareModal'));
    });
    // 測試按下 tab 會觸發 swichOptionHandler
    it('test handleTabClick', () => {
      testComp.find('li').at(2).simulate('click');
      expect(this.params.handleTabClick.mock.calls.length).toEqual(1);
    });
  });
});
