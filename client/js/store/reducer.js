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
  case 'UPDATE_CONFIG':
    return {
      ...state,
      config: {
        ...state.config,
        ...action.value,
      },
    };
  case 'UPDATE_STATUS':
    return {
      ...state,
      status: action.value,
    };
  default:
    return state;
  }
};

export default Reducer;
