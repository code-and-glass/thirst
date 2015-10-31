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
    return fetch(mainURL + '/drinks/drinks/randomDrinks', {method: 'get'})
      .then(response => {
        response.json().then(data => {
          console.log(data);
          dispatch({
            type: 'GET_DRINKS',
            value: data.results
          })
        })
      })
      .catch(error => console.log("This is an error: ", error))
  }
}

export function getRecommendations() {
  return function (dispatch, getState) {
    return fetch('/recommendKNN', {method: 'get'})
    .then(response => {
      response.json().then(data => {
        console.log(data);
        dispatch({
          type: "GET_RECOMMENDATIONS",
          value: data.results
        })
      })
    })
    .catch(error => console.log("This is an error: ", error))
  }
}
