/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import CreateProject from './index';

import storeFs from '../../reducers';
import action from '../../actions/index';

const store = createStore(storeFs);

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('CreateProject', function() {
  let testComp;

  beforeEach(() => {
    jest.resetModules();

    this.makeSubject = () => {
      testComp = mount(
        <Router>
          <Provider store={store}>
            <CreateProject />
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
    afterEach(() => {
      fetchMock.restore();
    });

    it('should be same as snapshot', async () => {
      fetchMock.getOnce(
        'http://codio_backend.hsc.nutc.edu.tw/api/Project/UseMnoGetProject',
        {
          body: {
            mProject: {
              mp_no: 'MP0000000014',
              m_no: 'M000000008',
            },
          },
        },
      );
      const expectedActions = [
        { type: 'GET_CODE_REQUEST' },
        { type: 'GET_CODE_SUCCESS', body: { html: '<h1>123</h1>', css: '', js: '' }},
      ];
      const store = mockStore({ todos: [] });

      return store.dispatch(action.getCodeByProjectId()).then(() => {
        const wrapper = render(testComp);
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
