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
        history.push('/homePage');
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
        m_name: payload.name,
        m_account: payload.id,
        m_pasword: payload.password,
        m_birthday: payload.birth,
        m_address: payload.address,
        m_phone: payload.phone,
        m_address_title: '',
        m_position: '',
        m_like: '',
      })
      .then((res) => {
        dispatch({ type: 'REGISTER_SUCCESS', res });
        history.push('/login');
      })
      .catch(err => dispatch({ type: 'REGISTER_FAILED', err }));
  };
};

export const forgetPassword = (payload) => {
  const URL = API.forget_password + payload.email;
  const getData = {
    method: 'GET',
    url: URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
  return (dispatch) => {
    dispatch({ type: 'FORGET_PASSWORD_REQUEST', payload });
    axios(getData)
      .then((res) => {
        dispatch({ type: 'FORGET_PASSWORD_SUCCESS', res });
        history.goBack();
      })
      .catch(err => dispatch({ type: 'FORGET_PASSWORD_FAILED', err }));
  };
};

export const updatePersonalInfo = (payload, history) => {
  const URL = API.update_personal_info;
  return (dispatch) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO_REQUEST', payload });
    axios
      .post(URL, {
        m_account: payload,
      })
      .then((res) => {
        dispatch({ type: 'UPDATE_PERSONAL_INFO_SUCCESS', res });
        history.goBack();
      })
      .catch(err => dispatch({ type: 'UPDATE_PERSONAL_INFO_FAILED', err }));
  };
};

export const logout = payload => ({ type: 'LOGOUT', payload });
