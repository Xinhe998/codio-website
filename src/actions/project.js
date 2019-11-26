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
        mp_hashtag: payload.tags,
        mp_desc: payload.desc,
        mp_isPublic: payload.privacy
      },
      headers: {
        Authorization: `bearer ${payload.token}`,
        'Content-Type': 'application/json',
      },
    };
    console.log(postData);
    axios(postData)
      .then((res) => {
        console.log(res);
        dispatch({ type: 'CREATE_PROJECT_SUCCESS', res });
        history.push(`/p/${res.data.mp_no}`);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'CREATE_PROJECT_FAILED', err });
      });
  };
};

export const deleteProject = (payload) => {
  const URL = API.delete_project + payload.mp_no;
  const getData = {
    method: 'GET',
    url: URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `bearer ${payload.token}`,
    },
  };
  return (dispatch) => {
    dispatch({ type: 'DELETE_PROJECT_REQUEST', payload });
    axios(getData)
      .then((res) => {
        dispatch({ type: 'DELETE_PROJECT_SUCCESS', res });
        history.goBack();
      })
      .catch(err => dispatch({ type: 'DELETE_PROJECT_FAILED', err }));
  };
};
