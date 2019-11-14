import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import storeFs from './reducers';

import '../styles/main.scss';
import App from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';
import ForgetPasswordModal from './pages/ForgetPasswordModal';
import CreateProject from './pages/CreateProject';
import PrivateRoute from './pages/PrivateRoute';
import HomePage from './pages/HomePage';
import Search from './pages/Search';
import Settings from './pages/Settings';
import Portfolio from './pages/Portfolio';
import EditResume from './pages/EditResume';

import usePrevious from './hooks/usePrevious';
import Admin from './pages/Admin';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, storeFs);

const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk),
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

const persistor = persistStore(store);

const CodioSwitch = ({ location }) => {
  const previousLocation = usePrevious(location);
  const isModal = !!(location.state && location.state.modal && previousLocation);
  return (
    <BrowserRouter>
      <Switch location={isModal ? previousLocation : location}>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forget_password" component={ForgetPassword} />
        <Route path="/admin" component={Admin} />
        <PrivateRoute path="/create_project" component={CreateProject} />
        <Route path="/p/:id" component={App} />
        <Route path="/homePage" component={HomePage} />
        <Route path="/homePage/editResume" component={EditResume} />
        <Route path="/search" component={Search} />
        <Route path="/settings" component={Settings} />
        <Route path="/portfolio" component={Portfolio} />
        
        {/* <Route path="/:type(foods|drinks)" component={App} /> */}
      </Switch>
      {isModal ? <Route path="/forget_password" component={ForgetPasswordModal} /> : null}
    </BrowserRouter>
  );
};

CodioSwitch.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Route component={CodioSwitch} />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
