const Reducer = (state, action) => {
  switch (action.type) {
  case 'UPDATE_NOTES':
    return {
      ...state,
      notes: action.value,
    };
  case 'UPDATE_MIDI':
    return {
      ...state,
      midi: action.value,
    };
  default:
    return state;
  }
};

export default Reducer;
