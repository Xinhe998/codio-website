const portfolioInitialState = {
  contents: '',
  m_no: '',
  mp_desc: '',
  mp_func: '',
  mp_hashtag: '',
  mp_isPublic: '',
  mp_name: '',
  mp_no: '',
};

export default function (state = portfolioInitialState, action) {
  switch (action.type) {
  case 'RESET_PORTFOLIO': {
    return portfolioInitialState;
  }
  case 'GET_PORTFOLIO': {
    const { status, data } = action.res;
    const portfolio = {
      contents: data.data,
      m_no: data.datatitle.mp_no, // 作者
      mp_desc: data.datatitle.mp_desc,
      mp_func: data.datatitle.mp_func,
      mp_hashtag: data.datatitle.mp_hashtag,
      mp_isPublic: data.datatitle.mp_isPublic,
      mp_name: data.datatitle.mp_name,
      mp_no: data.datatitle.mp_no,
    };
    return status === 200 ? portfolio : state;
  }
  case 'CREATE_PORTFOLIO': {
    const { status, data } = action.res;
    return status === 200 ? data.data : state;
  }
  default:
    return state;
  }
}
