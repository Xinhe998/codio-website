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
        console.log(res);
        history.push('/homePage');
      })
      .catch((err) => dispatch({ type: 'LOGIN_FAILED', err }));
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
      .catch((err) => dispatch({ type: 'REGISTER_FAILED', err }));
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
      .catch((err) => dispatch({ type: 'FORGET_PASSWORD_FAILED', err }));
  };
};

export const updatePersonalInfo = (payload, history) => {
  const URL = API.update_personal_info;
  const postData = {
    method: 'POST',
    url: URL,
    data: payload.data,
    headers: {
      Authorization: `bearer ${payload.token}`,
      'Content-Type': 'application/json',
    },
  };
  return (dispatch) => {
    axios(postData)
      .then((res) => {
        console.log(res);
        dispatch({ type: 'UPDATE_PERSONAL_INFO', res });
        if (history) history.push('/homepage');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updatePassword = (payload, history) => {
  const URL = API.update_password;
  return (dispatch) => {
    const postData = {
      method: 'POST',
      url: URL,
      data: {
        Email: payload.m_account,
        oldPassword: payload.oldPassword,
        newPassword: payload.newPassword,
      },
      headers: {
        Authorization: `bearer ${payload.token}`,
        'Content-Type': 'application/json',
      },
    };
    axios(postData)
      .then((res) => {
        dispatch({ type: 'UPDATE_PASSWORD', res });
        history.push('/homepage');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const logout = (history) => {
  return (dispatch) => {
    dispatch({ type: 'LOGOUT' });
    history.push('/login');
  };
};
