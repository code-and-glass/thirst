// ACTION CREATORS DO THE API / SERVER REQUESTS
// WE'RE USING THUNK MIDDLEWARE FOR ASYNC CALLS
// https://github.com/github/fetch   POLYFILL

var mainURL = window.location.href.split('/static')[0];

export function rate(drink, rating, drinkKey) {
  console.log("Rate action creator called", drink, rating, drinkKey);
  return function (dispatch, getState) {
    return fetch( mainURL + '/rate/rate', {
      method: 'post',
      body: JSON.stringify({rating: rating, drink: drink}),
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'}
    })
    .then(response => {
      //if response is 200
      dispatch({
        "type": "RATE",
        "name": drink,
        "rating": rating,
        "key": drinkKey
      })
    })
    .catch(err => {
      console.log("Error in rate", err)
    })
  }
}

export function getDrinks() {
  return function (dispatch, getState) {
    return fetch(mainURL + '/drinks/drinks/randomDrinks', {method: 'get'})
      .then(response => {
        response.json().then(data => {
          dispatch({
            type: 'GET_DRINKS',
            value: data.results
          })
        })
      })
      .catch(err => {
        console.log("Error in getDrinks", err)
      })
  }
}

export function getRecommendations() {
  return function (dispatch, getState) {
    return fetch('recommend/recommendKNN', {method: 'get'})
    .then(response => {
      response.json().then(data => {
        dispatch({
          type: "GET_RECOMMENDATIONS",
          value: data.results
        })
      })
    })
    .catch()
  }
}
