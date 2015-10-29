// ACTION CREATORS DO THE ACTUAL API / SERVER REQUESTS
// WE'RE USING THUNK AS MIDDLEWARE FOR ASYNC SERVER/API CALLS
// put .catch functions in as well to handle errors
// https://github.com/github/fetch   POLYFILL - use ajax if can't work this

export function test() {
  return function (dispatch, getState) {
    // We can dispatch both plain object actions and other thunks,
    // which lets us compose the asynchronous actions in a single flow.
    return fetch('/test', {method: 'get'})
    .then(
      response =>
        console.log(response),
        // dispatch({
        //   type: 'TEST',
        //   data: response.data
        // }),
      error => console.log(error)
    )
  }
}


export function postRatedDrink(drink) {
  return function (dispatch, getState) {
    return fetch('/api/rate', {            // WHAT ROUTE?
      method: 'post',
      body: {drink: drink}                 // WHAT FORMAT?
    })
    .then(
      response =>
        dispatch({
          type: 'RATE_DRINK',
          drinks: response.data.drinks     // WHAT FORMAT?
        }),
      error => console.log(error)
    )
  }
}

export function getDrinksToRate() {
  return function (dispatch, getState) {
    return fetch('/api/rate', {method: 'get'})   // ROUTE?
    .then(
      response =>
        dispatch({
          type: 'GET_DRINKS',
          drinks: response.data.drinks          // FORMAT?
        }),
      error => console.log(error)
    )
  }
}

export function getRecommendations() {
  return function (dispatch, getState) {
    return fetch('/api/recommend', {method: 'get'})   // ROUTE?
    .then(
      response =>
        dispatch({
          type: 'GET_RECS',
          recs: response.data.drinks          // FORMAT?
        }),
      error => console.log(error)
    )
  }
}

// IS THIS EVEN NEEDED?
export function notInterested(drink) {
  return {
    type: 'NOT_INTERESTED',
    drink: drink
  }
}
