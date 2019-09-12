import axios from 'axios';
import API from '../../config/api';

export const login = (payload, history) => {
  const URL = API.login;
  return (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST', payload });
    axios
      .post(URL, { m_account: payload.id, m_pasword: payload.password })
      .then((res) => {
        dispatch({ type: 'LOGIN_SUCCESS', res });
        history.push('/');
      })
      .catch(err => dispatch({ type: 'LOGIN_FAILED', err }));
  };
};

export const register = (payload, history) => {
  const URL = API.register;
  return (dispatch) => {
    dispatch({ type: 'REGISTER_REQUEST', payload });
    axios
      .post(URL, {
        m_account: payload.id,
        m_pasword: payload.password,
        m_name: payload.name,
        m_birthday: payload.birth,
        m_phone: payload.phone,
        m_address: payload.address,
      })
      .then((res) => {
        dispatch({ type: 'REGISTER_SUCCESS', res });
        history.push('/login');
      })
      .catch(err => dispatch({ type: 'REGISTER_FAILED', err }));
  };
};

export const logout = payload => ({ type: 'LOGOUT', payload });
