const React = require('react');


//server data placeholder
var drinksData = { drinks: ["absolut-cosmopolitan", "drink2", "drink3"]};


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
            <li><a href="">Recommendations</a></li>
            <li><a href="">Rate Drinks</a></li>
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
//Wire post stuff
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




module.exports = Main;


