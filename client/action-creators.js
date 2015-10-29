// ACTION CREATORS DO THE ACTUAL API / SERVER REQUESTS
// WE'RE USING THUNK AS MIDDLEWARE FOR ASYNC SERVER/API CALLS
// put .catch functions in as well to handle errors
// https://github.com/github/fetch   POLYFILL - use ajax if can't work this

export function test() {
  return function (dispatch, getState) {
    // We can dispatch both plain object actions and other thunks,
    // which lets us compose the asynchronous actions in a single flow.
    return fetch('/drinks', {method: 'get'})
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


export function rate(drink, rating) {
  return function (dispatch, getState) {
    return fetch('/rate', {
      method: 'post',
      body: {rating: rating, drink: drink}
    })
    .then(
      response =>
        dispatch({
          type: 'RATE_DRINK',
          drinks: response.body.results
        }),
      error => console.log(error)
    )
  }
}

export function getDrinks() {
  return function (dispatch, getState) {
    return fetch('/randomDrinks', {method: 'get'})
    .then(
      response =>
        dispatch({
          type: 'GET_DRINKS',
          drinks: response.body.results
        }),
      error => console.log(error)
    )
  }
}

export function getRecommendations() {
  return function (dispatch, getState) {
    return fetch('/recommendKNN', {method: 'get'})
    .then(
      response =>
        dispatch({
          type: 'GET_RECS',
          recs: response.body.results
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
