import React  from 'react'
import { Router, Route, Link, IndexRoute } from 'react-router';
import { connect, Provider } from 'react-redux'
import * as actionCreators from './action-creators'
import createStore from './create-store.js'
import { render } from 'react-dom'

const store = createStore();


function mapStateToProps(state){
  return {
    recommend: state._getThings.recommend,
    rate: state._getThings.rate
  };
}

const Main = React.createClass({
  render() {
    console.log(this.props.children);
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


const Nav = React.createClass({    // Needs to collapse better for mobile
  render() {

    return (
      <nav>
        <div className="nav-wrapper">
        <a href="#" className="brand-logo left">Thirst</a>
          <ul id="nav-mobile" className="right">
            <li><Link to="rate">Rate Drinks</Link></li>
            <li><Link to="recommend">Recommendations</Link></li>
            <li><a href="">Drinks I've Had</a></li>
            <li><a href="/logout">Logout</a></li>
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

  componentWillMount() {
    this.props.dispatch(actionCreators.getRecommendations())
  }

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

  componentWillMount() {
    this.props.dispatch(actionCreators.rate())
  }

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

  rate(drink) {
    this.props.dispatch(actionCreators.rateDrink(drink))
  },

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

    var starMaker = function(rating) {
      var rows = []
      for(var i = 0; i < 5; i++){
        rows.push(<RatingStar filled={ i < rating }/>);
      }
      return rows;
    }


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
            {starMaker(3)}
          </div>
      </div>
      )
  }
});

const RatingStar = React.createClass({

  render: function() {

    let star = this.props.filled ? "star" : "star_border"

    return (
      <a><i className="material-icons">{star}</i></a>
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



render(
  <Application store = {store} />,
  document.getElementById('app')
  );
