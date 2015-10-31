// ACTION CREATORS DO THE API / SERVER REQUESTS
// WE'RE USING THUNK MIDDLEWARE FOR ASYNC CALLS
// https://github.com/github/fetch   POLYFILL

var mainURL = window.location.href.split('/static')[0];

export function rate(drink, rating) {
  return function (dispatch, getState) {
    return fetch( mainURL + '/rate', {
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
  console.log("I got to getDrinks");
  return function (dispatch, getState) {
    return fetch(mainURL + '/drinks/randomDrinks', {method: 'get'})
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log("This is an error: ", error))
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
