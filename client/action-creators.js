
// ACTION CREATORS DO THE ACTUAL REQUESTS, SO WE NEED TO IMPLEMENT THOSE HERE.


/*********COMMUNICATE WITH SERVER***********/
export function getDrinks(user) {
  return {
    type: 'GET_DRINKS',
    user: user
  }
}

export function getRecs(user) {
  return {
    type: 'GET_RECS',
    user: user
  }
}

export function login(user) {
  return {
    type: 'LOGIN',
    user: user
  }
}

export function postRated(user) {
  return {
    type: 'POST_RATED',
    user: user
  }
}


/*********DON'T COMMUNICATE WITH SERVER***********/
export function notInterested(drink) {
  return {
    type: 'NOT_INTERESTED',
    drink: drink
  }
}

export function rateDrink(drink) {
  return {
    type: 'RATE_DRINK',
    drink: drink
  }
}




// EXAMPLE CODE BELOW WITH PROMISES

// We're using Bluebird (https://github.com/petkaantonov/bluebird) as promise library but you could really
// use any promise lib you want.
// import Promise from 'bluebird'

// Our action creator just gets the current time in a delayed fashion to illustrate the use of the promise
// middleware.

// The promise middleware works by waiting either:
// 1) an action with this format:
//    {
//      types: [REQUEST, SUCCESS, FAILURE], // actions types given in this specific order
//      promise: function() {
//        // return a promise
//      }
//    }
// 2) or anything else what would be passed to the next middleware or to Redux (actually, with this
//    implementation of the promise middleware, the "anything else" has to NOT contain a promise
//    property to be passed to the next middleware or Redux)

// When the promise middleware receives this action, it will create 2 actions from this one:
// 1 action for the REQUEST and later 1 action for the SUCCESS or the FAILURE of the action creator.

// Again, the code for the promise middleware is not complicated and it is worth having a look
// at it (./promise-middleware.js)

// The action is delayed by "delay" ms passed as a parameter of the action creator. Try to change
// this value to verify that the delay correctly impacts our UI.
// export function getTime(delay = 100) {
//   return {
//     types: ['GET_TIME_REQUEST', 'GET_TIME_SUCCESS', 'GET_TIME_FAILURE'],
//     promise: () => {
//       return new Promise((resolve, reject) => {
//         // Just simulating an async request to a server via a setTimeout
//         setTimeout(() => {
//           const d = new Date()
//           const ms = ('000' + d.getMilliseconds()).slice(-3)
//           resolve({
//             time: `${d.toString().match(/\d{2}:\d{2}:\d{2}/)[0]}.${ms}`
//           })
//         }, delay)
//       })
//     }
//   }
// }