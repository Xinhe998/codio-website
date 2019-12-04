const projectInitialState = {
  m_no: '',
  m_introduce: '',
  m_school: '',
  m_degree: '',
  m_major: '',
  m_inyear: '',
  m_outyear: '',
  m_skill: '',
  experience: [],
};

export default function (state = projectInitialState, action) {
  switch (action.type) {
  case 'CREATE_RESUME_REQUEST': {
    return { ...state, isLoading: true, errorMsg: null };
  }
  case 'CREATE_RESUME_SUCCESS': {
    const {
      data: { data, token }, status,
    } = action.res;
    return status === 200
      ? {
        ...state,
        token,
        ...data,
        isLoading: false,
        errorMsg: null,
      }
      : state;
  }
  case 'CREATE_RESUME_FAILED':
    return { ...state, errorMsg: 'Create Resume Failed', isLoading: false };
  case 'UPDATE_RESUME_REQUEST': {
    return { ...state, isLoading: true, errorMsg: null };
  }
  case 'UPDATE_RESUME_SUCCESS': {
    const { data: { data, token }, status } = action.res;
    return status === 200
      ? {
        ...state,
        ...data,
        token,
        isLoading: false,
        errorMsg: null,
      }
      : state;
  }
  case 'UPDATE_RESUME_FAILED':
    return { ...state, errorMsg: 'Create Resume Failed', isLoading: false };
  default:
    return state;
  }
}
