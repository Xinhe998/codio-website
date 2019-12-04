import axios from 'axios';
import API from '../../config/api';

export const createResume = (payload, history) => {
  const URL = API.create_resume;
  return (dispatch) => {
    dispatch({ type: 'CREATE_RESUME_REQUEST', payload });
    const postData = {
      method: 'POST',
      url: URL,
      data: payload.data,
      headers: {
        Authorization: `bearer ${payload.token}`,
        'Content-Type': 'application/json',
      },
    };
    console.log(postData);
    axios(postData)
      .then((res) => {
        console.log(res);
        dispatch({ type: 'CREATE_RESUME_SUCCESS', res });
        history.push('/resume');
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'CREATE_RESUME_FAILED', err });
      });
  };
};

export const updateResume = (payload, history) => {
  const URL = API.update_resume;
  const getData = {
    method: 'POST',
    url: URL,
    data: {
      basicIntro: {
        m_no: payload.m_no,
        m_introduce: payload.desc,
        m_school: payload.school,
        m_degree: payload.degree,
        m_major: payload.major,
        m_inyear: payload.startYear,
        m_outyear: payload.endYear,
        m_skill: payload.skill,
        experience: [
          {
            id: payload.id,
            m_no: payload.m_no,
            m_position: payload.position,
            m_company: payload.company,
            m_place: payload.place,
            m_isWorking: false,
            m_workStartyear: payload.workStartYear,
            m_workStartmonth: payload.workStartMonth,
            m_workContent: payload.desc,
          },
        ],
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `bearer ${payload.token}`,
    },
  };
  return (dispatch) => {
    dispatch({ type: 'UPDATE_RESUME_REQUEST', payload });
    axios(getData)
      .then((res) => {
        dispatch({ type: 'UPDATE_RESUME_SUCCESS', res });
        history.push('/resume');
      })
      .catch(err => dispatch({ type: 'UPDATE_RESUME_FAILED', err }));
  };
};
