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
import Editors from './index';

import storeFs from '../../reducers';

const store = createStore(storeFs);

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('Editors', function () {
  let testComp;

  beforeEach(() => {
    jest.resetModules();
    this.params = {
      currentActiveTab: 'html',
    };

    this.makeSubject = () => {
      const { currentActiveTab } = this.params;

      testComp = shallow(
        <Router>
          <Provider store={store}>
            <Editors
              currentActiveTab={currentActiveTab}
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
      expect(testComp.find('.playground'));
    });
  });
});
