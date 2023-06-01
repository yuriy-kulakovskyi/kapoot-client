const initialState = {
  language: 'en',
  opened: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE':
      return { ...state, language: action.payload };

    case 'TOGGLE_MENU':
      return { ...state, opened: !state.opened };
      
    default:
      return state;
  }
}

export default reducer;