//Main javascript file for react
//Babel will translate jsx syntax and Browserify will pull in the correct dependencies for require statements

//From the command line type: "grunt watch:react"

//It would be a good idea to split up into more

var React = require('react');
var ReactDOM = require('react-dom');
var Main = require('../babelified/components.js');


ReactDOM.render(
  <Main/>,
  document.getElementById('app')
);
