// ACTION CREATORS DO THE API / SERVER REQUESTS
// WE'RE USING THUNK MIDDLEWARE FOR ASYNC CALLS
// https://github.com/github/fetch   POLYFILL


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
