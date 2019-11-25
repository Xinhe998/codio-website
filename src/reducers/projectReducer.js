const projectInitialState = {};

export default function (state = projectInitialState, action) {
  switch (action.type) {
  case 'CREATE_PROJECT_REQUEST': {
    return { ...state, isLoading: true, errorMsg: null };
  }
  case 'CREATE_PROJECT_SUCCESS': {
    const {
      status,
      config: { data },
    } = action.res;
    const mp_no = action.res.data;

    const postData = JSON.parse(data);

    const newState = {
      ...state,
      isLoading: false,
      errorMsg: null,
    };
    newState[mp_no] = {
      mp_name: postData.mp_name,
      mp_desc: postData.mp_desc,
      mp_hashtag: postData.mp_hashtag,
      mp_isPublic: postData.mp_isPublic,
    };
    return status === 200 ? newState : state;
  }
  case 'CREATE_PROJECT_FAILED':
    return { ...state, errorMsg: 'Create Project Failed', isLoading: false };
  default:
    return state;
  }
}
