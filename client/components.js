import React  from 'react'
import { Router, Route, Link, IndexRoute } from 'react-router';
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import * as actionCreators from './action-creators'


import createStore from './create-store.js'

//The redux store
const store = createStore();

function mapStateToProps(state){
  return {
    recommend: state._getThings.recommend,
    rate: state._getThings.rate
  };
}


//server data placeholder
// var drinksData = { drinks: ["absolut-cosmopolitan", "Pennsylvania", "Kremlin-Colonel"]};
// var recommendData = { drinks: ["Pennsylvania", "Kremlin-Colonel", "absolut-cosmopolitan"]}

const Main = React.createClass({
  render() {
    return (
      <div>
        <Nav/>
        <div className="row">
          <div className="col s6 offset-s3">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  },
});

//NAVIGATION BAR

const Nav = React.createClass({    // Needs to collapse better for mobile
  render() {


    return (

      <nav>
        <div className="nav-wrapper">
        <a href="#" className="brand-logo left">Thirst</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>Logout</li>
            <li><Link to="recommend">Recommendations</Link></li>
            <li><Link to="rate">Rate Drinks</Link></li>
            <li><a href="">Drinks I've Had</a></li>
          </ul>
        </div>
      </nav>
    );
  },
  
  handleTouchTap() {
  },
});

@connect(mapStateToProps)
class Recommend extends React.Component {
  render() {

    let containerStyle = {
      position: 'relative',
      width: '80%',
      left: '10%',
      top: '50px',
    };

    console.log("Recommend Component Properties: ",this.props);
    return (
      <div className="recommend-container" style={ containerStyle }>
        {
          this.props.recommend.map(function(item){
            return <RecommendPanel drinkName={ item }></RecommendPanel>
          })
        }
      </div>
    );
  }
}

@connect(mapStateToProps)
class Rate extends React.Component {
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
          this.props.rate.map(function(item){
            return <RatingPanel drinkName={ item }></RatingPanel>
          })
        }
      </div>
    );
  }
};

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

    let imageStyles = {
      width: "inherit",
      height: "100%",
      "marginLeft": "450px"
    }

    var imageUrl = "http://assets.absolutdrinks.com/drinks/transparent-background-black/225x300/" + this.props.drinkName + ".png"
    return (
      <div className="card medium">
        <div className="card-image">
          <img src={imageUrl} style= { imageStyles }/>
          <span className="card-title black-text">{ this.props.drinkName }</span>
        </div>
        <div class="card-content">
          <span className="card-title activator grey-text text-darken-4"><i className="material-icons right">more_vert</i></span>
        </div>
        <DrinkReveal drinkname={this.props.drinkName}/>
      </div>
    )
  }
});

//Materialize card that will hold the picture of the drink and other components
const DrinkCard = React.createClass({



  render: function() {
    
    let imageStyles = {
      width: "inherit",
      height: "100%",
      "marginLeft": "450px"
    }

    var imageUrl = "http://assets.absolutdrinks.com/drinks/transparent-background-black/225x300/" + this.props.drinkName + ".png"

    return (
    <div className="card medium">
      <div className="card-image">
        <img src={imageUrl} style= { imageStyles }/>
        <span className="card-title black-text">{ this.props.drinkName }</span>
      </div>
      { this.props.children }
    </div>
    )
  }
});

//The UI for rating drinks. Will be used by DrinkCard
const RatingAction = React.createClass({

  render: function() {
    //Style icons color: black
    //Style hover to be yellow


    let firstLinkStyle = {
      "marginRight" : "inherit",
      "marginLeft" : "20px"
    }
    let firstIconStyle = {
      "marginRight": "60px"
    }
    let blackStar = {
      color: "black"
    }

    return (
      <div className="card-action">
          <div className="container">
            <a><i className="material-icons">not_interested</i></a>
            <a><i className="material-icons">grade</i></a>


            <a><i className="material-icons">grade</i></a>
            <a><i className="material-icons">grade</i></a>


            <a><i className="material-icons">grade</i></a>
            <a><i className="material-icons" style={blackStar}>grade</i></a>
          </div>

      </div>
      )
  }
});

const RatingStar = React.createClass({

  render: function() {


    return (
      <a><i className="material-icons">star_rate</i></a>
      )
  }
});

const DrinkReveal = React.createClass({
  render: function() {
    return (
      <div className="card-reveal">
        <span className="card-title black-text text-darken-4">{this.props.drinkName}<i className="material-icons right">close</i></span>
        <h3>{this.props.drinkName}</h3>
        <h4>Ingredients</h4>
        <ul>
          <li>2 Parts Absolut Citron</li>
          <li>1 Part Lime Juice</li>
          <li>1 Part Orange Liqueur</li>
          <li>½ Part Cranberry Juice</li>
          <li>1 Twist Orange</li>
        </ul>
      </div>
      )
  }
});


const DrinkContent = React.createClass({
  render: function() {
    return (
      <div className="card-content">
        <span className="card-title activator black-text">{this.props.drinkName}<i className="material-icons right">more_vert</i></span>
      </div>
    )
  }
});


const Application = React.createClass({

  render: function() {
    return (
      <Provider store={ this.props.store }>
        <Router>
          <Route path="/" component={Main}>
            <IndexRoute component={Rate}/>
            <Route path="rate" component={Rate} />
            <Route path="recommend" component={Recommend} />
          </Route>
        </Router>
      </Provider>    
    )
  }
})


//TODO: Make a default splash for the main screen. Possibly make redirection.
render( <Application store = {store} /> ,
  document.getElementById('app')
  );

