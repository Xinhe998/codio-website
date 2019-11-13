/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchBar from './index';

import fakeImg from '../../assets/smartmockups_jxfuqv8i.jpg';
import fakeAvatar from '../../assets/userImg.png';

import storeFs from '../../reducers';

const store = createStore(storeFs);

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('SearchBar', function() {
  let testComp;

  beforeEach(() => {
    jest.resetModules();
    this.params = {
      placeholder: 'Test',
    };

    this.makeSubject = () => {
      const { placeholder } = this.params;

      testComp = shallow(
        <Router>
          <Provider store={store}>
            <SearchBar placeholder={placeholder} />
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
      expect(testComp.find('.searchBar'));
    });
  });
});
