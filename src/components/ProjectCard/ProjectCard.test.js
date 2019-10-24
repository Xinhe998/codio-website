/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProjectCard from './index';

import fakeImg from '../../assets/smartmockups_jxfuqv8i.jpg';
import fakeAvatar from '../../assets/userImg.png';

import storeFs from '../../reducers';

const store = createStore(storeFs);

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('ProjectCard', function() {
  let testComp;

  beforeEach(() => {
    jest.resetModules();
    this.params = {
      img: fakeImg,
      title: 'TestProjectCard',
      avatar: fakeAvatar,
      viewCount: '1000',
      likeCount: '500',
      showPlace: true,
      place: '1',
    };

    this.makeSubject = () => {
      const {
        img,
        title,
        avatar,
        viewCount,
        likeCount,
        showPlace,
        place,
      } = this.params;

      testComp = shallow(
        <Router>
          <Provider store={store}>
            <ProjectCard
              img={img}
              title={title}
              avatar={avatar}
              viewCount={viewCount}
              likeCount={likeCount}
              showPlace={showPlace}
              place={place}
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
      expect(testComp.find('.ProjectCard'));
    });
  });
});
