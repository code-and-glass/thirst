
export function _getThings(state, action) {
  state = state || { random: [], recommended: [] };

  switch (action.type) {
    case 'GET_DRINKS':
      return {
        ...state,
        random: action.value
      }
    case 'GET_RECOMMENDATIONS':
      return {
        ...state,
        recommended: action.value
        //value should be the list of recommended drinks
      }
    default:
      return state
  }
}
