const userInitialState = {
  token: '',
  m_no: '',
  m_account: '',
  m_name: '',
  m_sex: '',
  m_birthday: '',
  m_phone: '',
  m_address: '',
  role_no: '',
  isLoading: false,
  errorMsg: null,
};

export default function (state = userInitialState, action) {
  switch (action.type) {
  case 'LOGIN_REQUEST': {
    return { ...state, isLoading: true };
  }
  case 'LOGIN_SUCCESS': {
    const {
      data: { token, member },
      status,
    } = action.res;
    return status === 200
      ? {
        ...state, isLoading: false, token, ...member,
      }
      : state;
  }
  case 'LOGIN_FAILED':
    return { ...state, errorMsg: 'Login Failed', isLoading: false };
  default:
    return state;
  }
}
