import axios from 'axios';
import API from '../../config/api';

export const createProject = (payload, history) => {
  const URL = API.create_project;
  return (dispatch) => {
    dispatch({ type: 'CREATE_PROJECT_REQUEST', payload });
    const postData = {
      method: 'POST',
      url: URL,
      data: {
        m_no: payload.m_no,
        mp_name: payload.title,
        mp_status: payload.privacy,
      },
      headers: {
        Authorization: `bearer ${payload.token}`,
        'Content-Type': 'application/json',
      },
    };
    axios(postData)
      .then((res) => {
        dispatch({ type: 'CREATE_PROJECT_SUCCESS', res });
        history.push(`/p/${payload.m_no}`);
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: 'CREATE_PROJECT_FAILED', err });
      });
  };
};

export const logout = payload => ({ type: 'LOGOUT', payload });
