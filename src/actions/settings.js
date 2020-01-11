export const updateCollaborativeMode = (payload) => {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_COLLABORATIVE_MODE', payload });
  };
};
