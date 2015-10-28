import React  from 'react'
import { Router, Route, Link, IndexRoute } from 'react-router';
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import * as actionCreators from './action-creators'


import createStore from './create-store.js'

const store = createStore();

function mapStateToProps(state){
  return {
    recommend: state._getThings.recommend,
    rate: state._getThings.rate
  };
}


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
});

//NAVIGATION BAR

const Nav = React.createClass({    // Needs to collapse better for mobile
  render() {


    return (

      <nav>
        <div className="nav-wrapper">
        <a href="#" className="brand-logo right">Thirst</a>
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
            return <RatingPanel drinkName={ item }></RatingPanel>
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

