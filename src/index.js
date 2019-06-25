import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './pages';
import '../styles/main.scss';

import storeFs from './reducers/store';

const store = createStore(storeFs,
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
