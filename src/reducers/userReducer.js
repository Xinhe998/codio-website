const userInitialState = {
  token: '',
  m_no: '',
  m_account: '',
  m_pasword: '',
  m_name: '',
  m_sex: '',
  m_birthday: '',
  m_phone: '',
  m_address: '',
  m_address_title: null,
  m_position: null,
  m_like: null,
  role_no: '',
  last_login_timestamp: '',
  isLoading: false,
  errorMsg: null,
};

export default function (state = userInitialState, action) {
  switch (action.type) {
  case 'LOGOUT': {
    return userInitialState;
  }
  case 'LOGIN_REQUEST': {
    return { ...state, isLoading: true, errorMsg: null };
  }
  case 'LOGIN_SUCCESS': {
    const {
      data: { token, data },
      status,
    } = action.res;
    return status === 200
      ? {
        ...state,
        isLoading: false,
        token,
        ...data,
        errorMsg: null,
        last_login_timestamp: new Date(),
      }
      : state;
  }
  case 'LOGIN_FAILED':
    return { ...state, errorMsg: 'Login Failed', isLoading: false };
  case 'REGISTER_REQUEST': {
    return { ...state, isLoading: true, errorMsg: null };
  }
  case 'REGISTER_SUCCESS': {
    const { status } = action.res;
    return status === 200
      ? {
        ...state,
        isLoading: false,
        errorMsg: null,
      }
      : state;
  }
  case 'REGISTER_FAILED':
    return { ...state, errorMsg: 'Register Failed', isLoading: false };

  case 'FORGET_PASSWORD_REQUEST': {
    return { ...state, isLoading: true, errorMsg: null };
  }
  case 'FORGET_PASSWORD_SUCCESS': {
    const { status } = action.res;
    return status === 200
      ? {
        ...state,
        isLoading: false,
        errorMsg: null,
      }
      : state;
  }
  case 'FORGET_PASSWORD_FAILED':
    return { ...state, errorMsg: 'Register Failed', isLoading: false };
  case 'UPDATE_PASSWORD':
    return state;
  case 'UPDATE_PERSONAL_INFO': {
    const {
      status,
      config: { data },
    } = action.res;
    const postData = JSON.parse(data);
    return status === 200
      ? {
        ...state,
        ...postData,
        isLoading: false,
        errorMsg: null,
      }
      : state;
  }
  default:
    return state;
  }
}
