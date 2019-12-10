const projectInitialState = [];

export default function (state = projectInitialState, action) {
  switch (action.type) {
  case 'GET_ALL_TAGS': {
    const { data, status } = action.res;
    const newData = data.split(',');
    return status === 200
      ? newData : state;
  }
  case 'ADD_TAG': {
    const { data, status } = action.res;
  }
  default:
    return state;
  }
}
