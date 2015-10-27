//Main javascript file for react
//Babel will translate jsx syntax and Browserify will pull in the correct dependencies for require statements

//From the command line type: "grunt watch:react"

// This file is the entry point of our JS bundle. It's here that we'll create our Redux store,
// instantiate our React Application root component and attach it to the DOM.

var React = require('react');
var ReactDOM = require('react-dom');
var Main = require('../babelified/components.js');

// All store creation specific code is in create-store.js
import createStore from './create-store'

// Application is the root component of our application and the one that holds Redux's Provider...
import Application from './application'


// create our redux instance using createStore
const store = createStore()


ReactDOM.render(
  // Provide our Redux store to our Root component as a prop so that Redux Provider can do its job.
  <div>
    <Main/>
    <div className="g-signin2" data-theme="dark">Login</div>
  </div>,
  // <Application store={store} />,
  document.getElementById('app')
);

// THIS FILE IS INDEX.JSX IN TUTORIAL
