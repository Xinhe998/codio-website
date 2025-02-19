import axios from 'axios';
import API from '../../config/api';

export const createPortfolio = (payload, history) => {
  const URL = API.create_portfolio;
  return (dispatch) => {
    const postData = {
      method: 'POST',
      url: URL,
      data: {
        mp_no: payload.mp_no,
        Data: payload.data,
      },
      headers: {
        Authorization: `bearer ${payload.token}`,
        'Content-Type': 'application/json',
      },
    };
    axios(postData)
      .then((res) => {
        dispatch({ type: 'CREATE_PORTFOLIO', res });
        console.log(res);
        // history.push(`/portfolio/${payload.mp_no}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getPortfolioById = (payload) => {
  const URL = API.get_portfolio;
  return (dispatch) => {
    const postData = {
      method: 'POST',
      url: URL,
      data: {
        mp_no: payload.mp_no,
      },
      headers: {
        // Authorization: `bearer ${payload.token}`,
        'Content-Type': 'application/json',
      },
    };
    axios(postData)
      .then((res) => {
        dispatch({ type: 'GET_PORTFOLIO', res });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const resetPortfolio = () => (dispatch) => {
  dispatch({ type: 'RESET_PORTFOLIO' });
};
