import axios from 'axios';
import API from '../../config/api';

export const getAllTags = (payload) => {
  const URL = API.get_all_tags;
  const getData = {
    method: 'GET',
    url: URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `bearer ${payload.token}`,
    },
  };
  return (dispatch) => {
    axios(getData)
      .then((res) => {
        dispatch({ type: 'GET_ALL_TAGS', res });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addTag = (payload) => {
  const URL = API.add_tag + payload.tagName;
  const getData = {
    method: 'GET',
    url: URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `bearer ${payload.token}`,
    },
  };
  return (dispatch) => {
    axios(getData)
      .then((res) => {
        console.log(res);
        dispatch({ type: 'ADD_TAG', res });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
