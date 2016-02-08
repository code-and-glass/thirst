// ACTION CREATORS DO THE API / SERVER REQUESTS
// WE'RE USING THUNK MIDDLEWARE FOR ASYNC CALLS
// https://github.com/github/fetch   POLYFILL

var mainURL = window.location.href.split('/static')[0];

var absolut = {
    'appId': '5761',
    'apiKey': '0f80b9b651e546ceb4fbe3ef9360c14a',
    'appSecret': 'd0eb2a88bedd4b3c8ad1e3b4f04a30fa'
  }

/*
* Post - User rates drink
*/
export function rate(drink, rating, drinkKey) {
  console.log("Rate action creator called", drink, rating, drinkKey);
  return function (dispatch, getState) {
    return fetch( mainURL + '/rate/rate', {
      method: 'post',
      credentials: 'same-origin',
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

/*
* GET - 10 Random drinks
*/
export function getDrinks() {
  return function (dispatch, getState) {
    return fetch(mainURL + '/drinks/drinks/randomDrinks', {method: 'get', credentials: 'same-origin'})
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

/*
* GET - recommendations for user
*/
export function getRecommendations() {
  return function (dispatch, getState) {
    // console.log("getRecommendations was called");
    return fetch(mainURL + '/recommend/recommendKNN', {method: 'get', credentials: 'same-origin'})
    .then(response => {
      // console.log("Recommendations response: ", response);
      response.json().then(data => {
        // console.log("data", data)
        dispatch({
          type: "GET_RECOMMENDATIONS",
          value: data.results
        })
      })
    })
    .catch()
  }
}

/*
* GET - users rated drinks
*/
export function getRated() {
  return function (dispatch, getState) {
    return fetch(mainURL + '/rated/drinks/ratedDrinks', {method: 'get', credentials: 'same-origin'})  // CHANGE ROUTE
      .then(response => {
        response.json().then(data => {
          console.log("This is data", data);
          if (data.results.length === 0) {
            data.results.push(false);
          }
          dispatch({
            type: 'GET_RATED',
            value: data.results
          })
        })
      })
      .catch(err => {
        console.log("Error in getRated", err)
      })
  }
}


addb.init({
    appId: 5761
});


export function getData(drinkName, originalName,  index) {
  return function(dispatch, getState){
    addb.drinks().howToMix(drinkName, function(howtomix) {
      console.log(howtomix);
      var fullText = ""
      var steps = howtomix.steps;
      for(var i = 0; i < steps.length; i++){
        fullText += steps[i].textPlain + " ";
      }
      dispatch({
        type:'HOW_TO_MIX',
        text: fullText,
        index: index,
        name: originalName
      })
    });
  }
}
  