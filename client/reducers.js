//placeholder
const initialState = {
  random: ["Mimoza", "Mojito", "Kremlin-Colonel", "American Dream"],
  recommended: ["absolut-cosmopolitan","Pennsylvania", "Kremlin-Colonel", "absolut-cosmopolitan"]
}

export function _getThings(state, action) {
  state = state || initialState;
  switch (action.type) {
    case 'GET_DRINKS':
      return {
        ...state,
        rate: action.value
      }
    case 'GET_RECS':
      return {
        ...state,
        recommended: action.value
        //value should be the list of recommended drinks
      }
    default:
      return state
  }
}
