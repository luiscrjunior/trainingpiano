const Reducer = (state, action) => {
  switch (action.type) {
  case 'SET_NEW_MESSAGE':
    return {
      ...state,
      message: action.value,
    };
  default:
    return state;
  }
};

export default Reducer;
