const React = require('react');
import { Router, Route, Link } from 'react-router';
import { render } from 'react-dom'

//server data placeholder
var drinksData = { drinks: ["absolut-cosmopolitan", "drink2", "drink3"]};


// TESTING COMPONENT
const Main = React.createClass({
  render() {

    let containerStyle = {
      position: 'relative',
      width: '80%',
      left: '10%',
      top: '100px',
    };

    return (
      <div>
        <Nav/>
        <LoginButton/>
        <RatingsPage/>
      </div>
    );
  },
  _handleTouchTap() {
  },
});

// RATE DRINK VIEW
const Rate = React.createClass({
  render() {

    let containerStyle = {
      position: 'relative',
      width: '80%',
      left: '10%',
      top: '100px',
    };

    return (
      <div>
        <Nav/>
        <BigCard/>
      </div>
    );
  },
  _handleTouchTap() {
  },
});

// LIST VIEW FOR RECOMMENDATIONS OR PAST RATINGS
const Recommendations = React.createClass({
  render() {

    let containerStyle = {
      position: 'relative',
      width: '80%',
      left: '10%',
      top: '100px',
    };

    return (
      <div>
        <Nav/>

      </div>
    );
  },
  _handleTouchTap() {
  },
});


// LOGIN VIEW, INCLUDING SPLASH SCREEN - DISPLAY IF NOT LOGGED IN
const Login = React.createClass({
  render() {

    let containerStyle = {
      position: 'relative',
      width: '100%',
      height: '700px',
      backgroundColor: 'lightblue',
    };

    let titleStyle = {
      textAlign: 'center',
      width: '100%',
      height: '100px',
    };

    let buttonStyle = {
      position: 'relative',
      textAlign: 'center',
      width: '50px',
      left: '50%',
      top: '200px',
    };

    return (
      <div style={containerStyle}>
        <h1 style={titleStyle}>Thirst</h1>
        <div style={buttonStyle}>
          <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
        </div>
      </div>
    );
  },
  _handleTouchTap() {
  },
});
// https://developers.google.com/identity/sign-in/web/sign-in
// https://developers.google.com/identity/sign-in/web/backend-auth







// SUB-COMPONENTS, FOR BUILDING THE ABOVE
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

const LoginButton = React.createClass({
  render() {

    let containerStyle = {
      position: 'relative',
      // width: '200px',
      left: '40%',
      top: '300px',
    };

    return (
      <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>

    );
  },

  _handleTouchTap() {
  },

});

// NAVIGATION BAR
const Nav = React.createClass({    // Needs to collapse better for mobile
  render() {

    let containerStyle = {
      position: 'absolute',
      width: '94%',
      left: '3%',
      top: '20px',
      paddingLeft: '10px',
    };

    return (
      <nav style={containerStyle}>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Thirst</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="test">Login</Link></li>
            <li><Link to="recommendations">Recommendations</Link></li>
            <li><Link to="/">Rate Drinks</Link></li>
            <li><a href="">Drinks I've Had</a></li>
          </ul>
        </div>
      </nav>
    );
  },
  _handleTouchTap() {
  },
});


const RatingsPage = React.createClass({
// const BigCard = React.createClass({
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

//TODO: Fill with actual data
const RatingPanel = React.createClass({
  render: function() {
    //TODO: adjust size
    //wire up buttons
    var imageUrl = "http://assets.absolutdrinks.com/drinks/transparent-background-black/" + this.props.drinkName + ".png"

    return (
    <div className="card">
      <div className="card-image">
        <img src={imageUrl}/>
        <span className="card-title">{ this.props.drinkName }</span>
      </div>
      <div className="card-content">
        <h5>Rate this drink:</h5>
      </div>
      <div className="card-action">
        <i className="small material-icons">not_interested</i>
        <i className="small material-icons">star_rate</i>
        <i className="small material-icons">star_rate</i>
        <i className="small material-icons">star_rate</i>
        <i className="small material-icons">star_rate</i>
        <i className="small material-icons">star_rate</i>
      </div>
    </div>
    )
  }
});


render((
  <Router>
    <Route path="/" component={Main} />
    <Route path="test" component={Login} />
    <Route path="recommendations" component={Recommendations} />
  </Router>
), document.body)


module.exports = Main;


