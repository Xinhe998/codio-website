import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import storeFs from './reducers';

import '../styles/main.scss';
import App from './pages';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPasswordModal from './pages/ForgetPasswordModal';
import ForgetPassword from './pages/ForgetPassword';
import CreateProject from './pages/CreateProject';

import usePrevious from './hooks/usePrevious';
import Admin from './pages/Admin';

const store = createStore(
  storeFs,
  compose(
    applyMiddleware(thunk),
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

const CodioSwitch = ({ location }) => {
  const previousLocation = usePrevious(location);
  const isModal = !!(location.state && location.state.modal && previousLocation);
  return (
    <>
      <Switch location={isModal ? previousLocation : location}>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forget_password" component={ForgetPassword} />
        <Route path="/admin" component={Admin} />
        <Route path="/create_project" component={CreateProject} />
        {/* <Route path="/:type(foods|drinks)" component={App} /> */}
      </Switch>
      {isModal ? <Route path="/forget_password" component={ForgetPasswordModal} /> : null}
    </>
  );
};

CodioSwitch.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={CodioSwitch} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
