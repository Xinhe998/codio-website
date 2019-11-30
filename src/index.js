/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
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
import Resume from './pages/Resume';

import usePrevious from './hooks/usePrevious';
import Admin from './pages/Admin';

const history = createBrowserHistory();
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, storeFs);

const composeSetup =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(
  persistedReducer,
  composeSetup(applyMiddleware(thunk)),
);

const persistor = persistStore(store);

const notfound = () => <h1>敬請期待！</h1>;

const CodioSwitch = ({ location }) => {
  const previousLocation = usePrevious(location);
  const isModal = !!(
    location.state &&
    location.state.modal &&
    previousLocation
  );
  return (
    <Router history={history}>
      <Switch location={isModal ? previousLocation : location}>
        <Route path="/forget_password" component={ForgetPassword} />
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/create_project" component={CreateProject} />
        <Route path="/admin" component={Admin} />
        <Route path="/p/:id" component={App} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/resume/edit" component={EditResume} />
        <Route path="/resume" component={Resume} />
        <Route path="/search" component={Search} />
        <Route path="/settings" component={Settings} />
        <Route exact path="/homePage" component={HomePage} />
        <Route component={notfound} />
      </Switch>
      {isModal ? (
        <Route exact path="/forget_password" component={ForgetPasswordModal} />
      ) : null}
    </Router>
  );
};

CodioSwitch.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <Route component={CodioSwitch} />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
