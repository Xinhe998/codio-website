import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import storeFs from './reducers/store';

import '../styles/main.scss';
import App from './pages';

const store = createStore(storeFs,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={App} />
        {/* <Route path="/:type(foods|drinks)" component={App} /> */}
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
