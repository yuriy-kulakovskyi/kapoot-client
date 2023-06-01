export const changeLanguage = language => {
  return {
    type: 'CHANGE_LANGUAGE',
    payload: language
  };
}

export const toggleMenu = () => {
  return {
    type: 'TOGGLE_MENU'
  };
}