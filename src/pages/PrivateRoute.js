import React from 'react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

import Login from './Login';

const PrivateRoute = ({ component, ...rest }) => {
  const userData = window.localStorage.getItem('persist:root');
  const isAuthed = userData && JSON.parse(JSON.parse(userData).user).token;
  return (
    <Route
      {...rest}
      exact
      render={props => (isAuthed ? (
        <div>{React.createElement(component, props)}</div>
      ) : (
        // <Router>
          <div>
            <Route exact path="/login" component={Login} />
            <Redirect
              exact
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          </div>
        // </Router>
      ))
      }
    />
  );
};

export default PrivateRoute;
