import axios from 'axios';
import API from '../../config/api';

export const updateCode = (payload) => {
  const URL = API.save_code;
  const postData = {
    method: 'POST',
    url: URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `bearer ${payload.token}`,
    },
    data: {
      mp_no: payload.projectId,
      Data: [
        {
          mp_no: payload.projectId,
          mpd_name: 'HTML',
          mpd_content: payload.html,
        },
        {
          mp_no: payload.projectId,
          mpd_name: 'CSS',
          mpd_content: payload.css,
        },
        {
          mp_no: payload.projectId,
          mpd_name: 'Javascript',
          mpd_content: payload.js,
        },
      ],
    },
  };
  return (dispatch) => {
    axios(postData)
      .then((res) => {
        if (res.data === '儲存成功')
          dispatch({
            type: 'UPDATE_CODE',
            payload: {
              html: payload.html,
              css: payload.css,
              js: payload.js,
            },
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getCodeByProjectId = (payload, history) => {
  const URL = API.get_code_by_project_id;
  const postData = {
    method: 'POST',
    url: URL,
    data: {
      mp_no: payload.projectId,
      m_no: payload.m_no,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `bearer ${payload.token}`,
    },
  };
  console.log(postData);
  return (dispatch) => {
    dispatch({ type: 'GET_CODE_REQUEST' });
    axios(postData)
      .then((res) => {
        console.log(res);
        const result = {};
        if (res.data.length) {
          res.data.map((item) => {
            switch (item.mpd_name) {
              case 'HTML':
                result.html = item.mpd_content;
                break;
              case 'CSS':
                result.css = item.mpd_content;
                break;
              case 'Javascript':
                result.js = item.mpd_content;
                break;
              default:
                break;
            }
          });
        }
        dispatch({ type: 'UPDATE_CODE', payload: result });
        dispatch({ type: 'GET_CODE_SUCCESS' });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'GET_CODE_FAILED', err });
        // history.push('/notfound');
      });
  };
};

export const updateHtml = (payload) => ({ type: 'UPDATE_HTML', payload });
export const updateCss = (payload) => ({ type: 'UPDATE_CSS', payload });
export const updateJs = (payload) => ({ type: 'UPDATE_JS', payload });

export const addLogs = (payload) => ({ type: 'ADD_LOGS', payload });

export const resetAll = () => ({ type: 'RESET' });
