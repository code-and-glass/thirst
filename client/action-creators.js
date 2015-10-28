// ACTION CREATORS DO THE ACTUAL API / SERVER REQUESTS
// WE'RE USING THUNK AS MIDDLEWARE FOR ASYNC SERVER/API CALLS
// put .catch functions in as well to handle errors
// https://github.com/github/fetch   POLYFILL - use ajax if can't work this

export function onLogin() {
  return function (dispatch, getState) {
    // We can dispatch both plain object actions and other thunks,
    // which lets us compose the asynchronous actions in a single flow.
    return dispatch(
      fetch('/api/login', { // fetch user info when redirected to client / on first load
	      method: 'get'
      }).then(response =>
        dispatch({
          type: 'ON_LOGIN',
          data: response.data // or whatever format is
        }) // what page do we show them on login?
      )
    )
  }
}

export function postRatedDrink(drink) {
  return function (dispatch, getState) {
    return dispatch(
      fetch('/api/rate', {
	      method: 'post',
        body: {drink: drink}
      }).then((response) =>
        dispatch({
          type: 'RATE_DRINK',
          drinks: response.data.drinks   // or whatever
        })
      )
    )
  }
}

export function getDrinksToRate() {
  return function (dispatch, getState) {
    return dispatch(
      fetch('/api/rate', {method: 'get'})
      .then((response) =>
        dispatch({
          type: 'GET_DRINKS',
          drinks: response.data.drinks // or whatever it is
        })
      )
    )
  }
}

export function getRecommendations() {
  return function (dispatch, getState) {
    return dispatch(
      fetch('/api/recommend', {method: 'get'})
      .then((response) =>
        dispatch({
          type: 'GET_RECS',
          recs: response.data.recommendations // or whatever
        })
      )
    )
  }
}

export function notInterested(drink) {
  return {
    type: 'NOT_INTERESTED',
    drink: drink
  }
}

