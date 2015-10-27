

import React from 'react'
import { Router, Route, Link, IndexRoute } from 'react-router';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import * as actionCreators from './action-creators'

// @connect((state/*, props*/) => {
//     // This is our select function that will extract from the state the data slice we want to expose
//     // through props to our component.
//     return {
//       reduxState: state,
//       // SOMETHING ABOUT DRINKS HERE, FOR EXAMPLE
//     }
// })
// SEE EXAMPLE COMPONENT IN HOME.JSX FOR INTEGRATING COMPONENS WITH REDUX


//server data placeholder
var drinksData = { drinks: ["absolut-cosmopolitan", "Pennsylvania", "Kremlin-Colonel"]};
var recommendData = { drinks: ["Pennsylvania", "Kremlin-Colonel", "absolut-cosmopolitan"]}


const Main = React.createClass({
  render() {

    return (
      <div>
        <Nav/>
          <div className="row">
            <div className="col s8 offset-s2">
              {this.props.children}
            </div>
          </div>
      </div>
    );
  },
  _handleTouchTap() {
  },
});

// LOGIN VIEW, INCLUDING SPLASH SCREEN - DISPLAY IF NOT LOGGED IN
const Login = React.createClass({

  onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    // var profile = googleUser.getBasicProfile();
    // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    // console.log("Name: " + profile.getName());
    // console.log("Image URL: " + profile.getImageUrl());
    // console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    this.props.dispatch(actionCreators.login(id_token));
  },

  testFn() {
    alert('hahaha')
  },

  render() {

    let containerStyle = {
      position: 'relative',
      width: '100%',
      height: '700px'
    };

    let titleStyle = {
      textAlign: 'center',
      width: '100%',
      height: '100px',
    };

    let buttonStyle = {
      position: 'relative',
      textAlign: 'center',
      // height: '100px',
      // width: '100px',
      left: '50%',
      top: '500px'
    };

    return (
      <div style={containerStyle}>
        <h1 style={titleStyle} onClick={this.onSignIn}>Thirst</h1>
        <div className="g-signin2" data-onsuccess={this.onSignIn} data-theme="dark">Login</div>
      </div>
    );
  },
  _handleTouchTap() {
  },
});
// https://developers.google.com/identity/sign-in/web/sign-in
// https://developers.google.com/identity/sign-in/web/backend-auth


//NAVIGATION BAR
 const Nav = React.createClass({    // Needs to collapse better for mobile

   recommend() {
     this.props.dispatch(actionCreators.getRecommendations(reduxState.user));  // for example
   },

   render() {
     return (
      <nav>
        <div className="nav-wrapper">
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="login">Login</Link></li>
            <li><Link to="recommend">Recommendations</Link></li>
            <li><Link to="rate">Rate Drinks</Link></li>
            <li><a href="">Drinks I've Had</a></li>
          </ul>
        </div>
      </nav>
     );
   },
   _handleTouchTap() {
   },
 });

//Page for recommended drinks
const Recommend = React.createClass({
  render() {

    let containerStyle = {
      position: 'relative',
      width: '80%',
      left: '10%',
      top: '50px',
    };

    return (
      <div className="recommend-container" style={ containerStyle }>
        {
          recommendData.drinks.map(function(item){
            return <RecommendPanel drinkName={item}/>
          })
        }
      </div>
    );
  },
  _handleTouchTap() {
  },
});

//Page for rating drinks
const Rate = React.createClass({
  render() {

    let containerStyle = {
      position: 'relative',
      width: '80%',
      left: '10%',
      top: '100px',
    };

    return (
      <div className="rating-container" style={ containerStyle }>
        {
          drinksData.drinks.map(function(item){
            return <RatingPanel drinkName={ item }></RatingPanel>
          })
        }
      </div>
    );
  },
  _handleTouchTap() {
  },
});

const RatingPanel = React.createClass({
  render: function() {
    //TODO: adjust size
    //wire up buttons

    return (
      <DrinkCard drinkName={this.props.drinkName}>
        <RatingAction/>
      </DrinkCard>
    )
  }
});

//TODO:Add expected rating or ranking
const RecommendPanel = React.createClass({
  render: function() {
    return (
      <DrinkCard drinkName={this.props.drinkName}>
        <DrinkContent drinkName={this.props.drinkName}/>
        <DrinkReveal drinkname={this.props.drinkName}/>
      </DrinkCard>
    )
  }
});

//Materialize card that will hold the picture of the drink and other components
const DrinkCard = React.createClass({
  render: function() {
    var imageUrl = "http://assets.absolutdrinks.com/drinks/transparent-background-black/225x300/" + this.props.drinkName + ".png"

    return (
    <div className="card">
      <div className="card-image">
        <img src={imageUrl}/>
        <span className="card-title">{ this.props.drinkName }</span>
      </div>
      { this.props.children }
    </div>
    )
  }
});

//The UI for rating drinks. Will be used by DrinkCard
const RatingAction = React.createClass({
  render: function() {
    return (
      <div className="card-action">
        <i className="small material-icons">not_interested</i>
        <i className="small material-icons">star_rate</i>
        <i className="small material-icons">star_rate</i>
        <i className="small material-icons">star_rate</i>
        <i className="small material-icons">star_rate</i>
      </div>
      )
  }
});

const DrinkReveal = React.createClass({
  render: function() {
    return (
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">{this.props.drinkName}<i className="material-icons right">close</i></span>
        <p>This will have more information about the drinks</p>
      </div>
      )
  }
});


const DrinkContent = React.createClass({
  render: function() {
    return (
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">{this.props.drinkName}<i className="material-icons right">more_vert</i></span>
      </div>
    )
  }
});

//Routes - need to figure out how login will work (server/client redirection)
render((
  <Router>
    <Route path="/" component={Main}>
      <Route path="login" component={Login} />
      <Route path="rate" component={Rate} />
      <Route path="recommend" component={Recommend} />
    </Route>
  </Router>
), document.body);


module.exports = Main;
