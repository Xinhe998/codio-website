import axios from 'axios';
import API from '../../config/api';

export const login = (payload) => {
  const URL = API.login;
  return (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST', payload });
    axios
      .post(URL, { m_account: payload.id, m_pasword: payload.password })
      .then(res => dispatch({ type: 'LOGIN_SUCCESS', res }))
      .catch(err => dispatch({ type: 'LOGIN_ERROR', err }));
  };
};

export const logout = payload => (
  { type: 'LOGOUT', payload }
);
