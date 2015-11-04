import React  from 'react'
import { Router, Route, Link, IndexRoute } from 'react-router';
import { connect, Provider } from 'react-redux'
import * as actionCreators from './action-creators'
import createStore from './create-store.js'
import { render } from 'react-dom'

const store = createStore();

function mapStateToProps(state){
  return {
    recommended: state._getThings.recommended,
    random: state._getThings.random
  };
}

const Main = React.createClass({
  render() {
    return (
      <div>
        <Nav/>
        <div className="row">
          <div className="col s12 m8 l6 offset-l3 offset-m2">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  },
});


const Nav = React.createClass({
  render() {


    $( document ).ready(function(){
      $(".button-collapse").sideNav({closeOnClick: true})  // other options?
    })


    return (

      <nav>
        <div className="nav-wrapper indigo">
          <a href="#" className="brand-logo" style={{ paddingLeft:'10px', fontWeight:'lighter' }}>Thirst</a>
          <a href="#" data-activates="mobile-demo" className="button-collapse" style={{ paddingLeft:'10px' }}>
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="random">Random Drinks</Link></li>
            <li><Link to="recommended">Recommendations</Link></li>
            <li><a href="">Drinks I've Had</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li><Link to="random">Random Drinks</Link></li>
            <li><Link to="recommended">Recommendations</Link></li>
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
class Recommended extends React.Component {

  componentWillMount() {
    this.props.dispatch(actionCreators.getRecommendations())
  }

  render() {

    let containerStyle = {
      position: 'relative',
      top: '30px',
    };

    return (

      <div className="recommended-container" style={ containerStyle }>
        {
          this.props.recommended.map(function(item, key){
            return <DrinkCard drink={item}></DrinkCard>
          })
        }
      </div>
    );
  }
}

@connect(mapStateToProps)
class Random extends React.Component {

  componentWillMount() {
    this.props.dispatch(actionCreators.getDrinks());
  }

  render() {
    
    let containerStyle = {
      position: 'relative',
      top: '30px',
    };

    return (
      <div className="rating-container" style={ containerStyle }>
        {
          this.props.random.map(function(item, key){
            return ( 
            <DrinkCard drink={item} rating={item.rating || 0} drinkKey={key} key={key}>
            </DrinkCard>
            )
          })
        }
      </div>
    );
  }
};

//Materialize card that will hold the picture of the drink and other components
const DrinkCard = React.createClass({

  render: function() {

    let imageStyles = {
      width: "100%",
      height: "100%",
      "paddingRight": "30px",
      "paddingTop": "55px",
    }

    var urlName = this.props.drink.name.replace(" ", "-");
    var imageUrl = "http://assets.absolutdrinks.com/drinks/225x300/" + urlName + ".png"
    return (
    <div className="card medium">
      <div className="card-image right">
        <img src={imageUrl} style={imageStyles}/>
      </div>
      <span className="card-title black-text">{ this.props.drink.name }</span>
      <DrinkReveal drink={this.props.drink}/>
      <RatingAction drink={this.props.drink} rating={this.props.rating } drinkKey={this.props.drinkKey}/>
    </div>
    )
  }
});

//The UI for rating drinks. Will be used by DrinkCard
const RatingAction = React.createClass({

  // getInitialState: function(){
  //   return {rating: this.props.rating}
  // }

  render: function() {
    var drink = this.props.drink;
    var drinkKey = this.props.drinkKey;

    var starMaker = function(rating) {
      var rows = []
      for(var i = 0; i < 5; i++){
        rows.push(<RatingStar filled={ i < rating } drink={drink} drinkKey={drinkKey} value={i} key={i}/>);
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
            {starMaker(this.props.rating || 0)}
            <span className="card-title activator grey-text text-darken-4"><i className="material-icons right">more_vert</i></span>
          </div>
      </div>
    )
  }
});


@connect()
class RatingStar extends React.Component {

  render() {
    let star = this.props.filled ? "star" : "star_border"
    var handleClick = event => this.props.dispatch(actionCreators.rate(this.props.drink.name , this.props.value + 1, this.props.drinkKey))

    return (
      <a onClick={ handleClick }>
        <i className="material-icons">{star}</i>
      </a>
    )
  }
};

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


const Application = React.createClass({

  render: function() {
    return (
      <Provider store={ this.props.store }>
        <Router>
          <Route path="/" component={Main}>
            <IndexRoute component={Random}/>
            <Route path="random" component={Random} />
            <Route path="recommended" component={Recommended} />
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
