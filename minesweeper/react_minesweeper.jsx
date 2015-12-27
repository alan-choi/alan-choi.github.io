var React = require('react');
var ReactDOM = require('react-dom');
var Game = require('./components/game');

document.addEventListener("DOMContentLoaded", function() {
  return ReactDOM.render(<Game />, document.getElementById('content'));
});
