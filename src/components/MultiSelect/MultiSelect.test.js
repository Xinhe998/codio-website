/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MultiSelect from './index';

import storeFs from '../../reducers';

const store = createStore(storeFs);

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('MultiSelect', function () {
  let testComp;

  beforeEach(() => {
    jest.resetModules();
    this.params = {
      title: 'TestMultiSelect',
      options: ['option1', 'option2', 'option3'],
      selectedItems: ['option1'],
      onChange: jest.fn(),
    };

    this.makeSubject = () => {
      const { title, options, selectedItems, onChange } = this.params;

      testComp = mount(
        <Router>
          <Provider store={store}>
            <MultiSelect
              title={title}
              options={options}
              selectedItems={selectedItems}
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
      expect(testComp.find('.MultiSelect'));
    });
  });
});
