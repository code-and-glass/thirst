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
    random: state._getThings.random,
    rated: state._getThings.rated
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

/*
* Navbar
*/

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
            <li><Link to="rated">Rated</Link></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li><Link to="random">Random Drinks</Link></li>
            <li><Link to="recommended">Recommendations</Link></li>
            <li><Link to="rated">Rated</Link></li>
            <li><a href="/logout">Logout</a></li>

          </ul>
        </div>
      </nav>
    );
  },

  handleTouchTap() {
  },
});

/*
* Retrieves recommendations
*/

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
            // console.log("item:", item, "key:", key);
            if (item === "Invite some friends and rate more drinks to receive recommendations!") {
              return <AlertCard text={item}></AlertCard>
            }
            return <DrinkCard drink={item} rating={item.rating || 0} drinkKey={key} key={key}></DrinkCard>
          })
        }
      </div>
    );
  }
}

/*
* Retrieves 10 Random Drinks
*/

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


@connect(mapStateToProps)
class Rated extends React.Component {

  componentWillMount() {
    this.props.dispatch(actionCreators.getRated());
  }

  render() {

    let containerStyle = {
      position: 'relative',
      top: '30px',
    };

    return (
      <div className="rating-container" style={ containerStyle }>
        {
          this.props.rated.map(function(item, key){
            // if ()
            console.log("rating container: item:", item, "key:", key);
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

const AlertCard = React.createClass({
  render: function () {
    let alertStyles = {
      "marginRight": "50px",
      "marginTop": "25px",
      "textAlign": "center",
      "fontSize": "23px",
      // "color": "#C2185B"
      // "backgroundColor": "#grey darken-4"
    }

    return (
    <div className="card-panel grey darken-4 white-text" style={alertStyles}>{this.props.text}</div>
    )
  }
});

//Materialize card that will hold the picture of the drink and other components
const DrinkCard = React.createClass({

  render: function() {

    let imageStyles = {
      "marginRight": "50px",
      "marginTop": "25px",
    }

    var urlName = this.props.drink.name.replace(/\s/g, "-");
    var imageUrl = "http://assets.absolutdrinks.com/drinks/150x150/" + urlName + ".png"
    return (
    <div className="card small hoverable">
      <div className="card-image right" style={imageStyles}>
        <img src={imageUrl}/>
      </div>
      <div className="card-content">
        <span className="card-title black-text">{ this.props.drink.name }</span>
      </div>
      <RatingAction drink={this.props.drink} rating={this.props.rating } drinkKey={this.props.drinkKey}/>
      <DrinkReveal drink={this.props.drink} text={this.props.drink.text} index={this.props.drinkKey}/>
    </div>
    )
  }
});

//The UI for rating drinks. Will be used by DrinkCard
const RatingAction = React.createClass({
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

    return (
      <div className="card-action">
          <div>
            <a><i className="material-icons">not_interested</i></a>
            {starMaker(this.props.rating || 0)}
            <span className="activator grey-text text-darken-4"><i className="small material-icons right">more_vert</i></span>
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

@connect()
class DrinkReveal extends React.Component{
  
  componentWillMount() {
    var urlName = this.props.drink.name.replace(/\s/g, "-");
    this.props.dispatch(actionCreators.getData(urlName, this.props.drink.name, this.props.index));
  }

  render() {
    console.log(this.props.drink);
    return (
      <div className="card-reveal">
        <span className="card-title black-text text-darken-4">{this.props.drink.name}<i className="material-icons right">close</i></span>
        <p>{this.props.text || "no data yet"}</p>
      </div>
    )
  }
};


const Application = React.createClass({

  render: function() {
    return (
      <Provider store={ this.props.store }>
        <Router>
          <Route path="/" component={Main}>
            <IndexRoute component={Random}/>
            <Route path="random" component={Random} />
            <Route path="recommended" component={Recommended} />
            <Route path="rated" component={Rated} />
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
