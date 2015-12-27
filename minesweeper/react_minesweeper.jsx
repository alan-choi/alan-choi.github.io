var Game = require('./components/game');
var React = require('react');
var ReactDOM = require('react-dom');

document.addEventListener("DOMContentLoaded", function() {
  return ReactDOM.render(<Game />, document.getElementById('content'));
});
