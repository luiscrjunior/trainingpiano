const Reducer = (state, action) => {
  switch (action.type) {
  case 'GENERATE_NEW_NOTES':
    return {
      ...state,
      notes: action.value,
    };
  default:
    return state;
  }
};

export default Reducer;
