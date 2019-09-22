const projectInitialState = {};

export default function (state = projectInitialState, action) {
  switch (action.type) {
  case 'CREATE_PROJECT_REQUEST': {
    return { ...state, isLoading: true, errorMsg: null };
  }
  case 'CREATE_PROJECT_SUCCESS': {
    const {
      data: { mp_no },
      status,
      config: { data },
    } = action.res;

    const postData = JSON.parse(data);

    const newState = {
      ...state,
      isLoading: false,
      errorMsg: null,
    };
    newState[mp_no] = {
      mp_name: postData.mp_name,
      mp_status: postData.mp_status,
    };
    return status === 200
      ? newState : state;
  }
  case 'CREATE_PROJECT_FAILED':
    return { ...state, errorMsg: 'Create Project Failed', isLoading: false };
  default:
    return state;
  }
}
