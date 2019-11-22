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
