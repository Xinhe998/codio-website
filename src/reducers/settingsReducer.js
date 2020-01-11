const projectInitialState = {
  collborative_mode: false,
};

export default function(state = projectInitialState, action) {
  switch (action.type) {
    case 'UPDATE_COLLABORATIVE_MODE': {
      const data = action.payload === 'On';
      return { ...state, collborative_mode: data };
    }
    default:
      return state;
  }
}
