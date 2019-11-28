const portfolioInitialState = [];

export default function (state = portfolioInitialState, action) {
  switch (action.type) {
  case 'GET_PORTFOLIO': {
    const { status, data } = action.res;
    return status === 200 ? data.data : state;
  }
  case 'CREATE_PORTFOLIO': {
    const { status, data } = action.res;
    return status === 200 ? data.data : state;
  }
  default:
    return state;
  }
}
