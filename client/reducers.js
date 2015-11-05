
export function _getThings(state, action) {
  state = state || { random: [], recommended: [], rated: [] };

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
      }
    case 'GET_RATED':
      return {
        ...state,
        rated: action.value
      }
    case 'RATE':
      var newState = { random: [ ...state.random], recommended: [...state.recommended ], rated: [...state.rated] };
      if(newState.recommended[action.key] && newState.recommended[action.key].name === action.name){
        newState.recommended[action.key].rating = action.rating;
      }
      if(newState.random[action.key] && newState.random[action.key].name === action.name){
        newState.random[action.key].rating = action.rating;
      }
      return newState;
    default:
      return state
  }
}
