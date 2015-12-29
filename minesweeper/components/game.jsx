var Board = require('./board');
var React = require('react');
var Minesweeper = require('../minesweeper_logic');

var Game = React.createClass({
  getInitialState: function() {
    var board = new Minesweeper.Board('easy');
    return {
      board: board,
      gameOver: false,
      level: 'easy'
     };
  },

  restartGame: function() {
    this.setState({
      board: new Minesweeper.Board(this.state.level),
      gameOver: false
     });
  },

  updateGame: function(tile, flagged) {
    if (!this.state.gameOver) {
      if (flagged) {
        tile.toggleFlag();
      } else {
        tile.explore();
      }
      this.setState({ board: this.state.board });
    }
    if (this.gameOver()){
      this.endGame();
    }
  },

  handleLevel: function(event) {
    event.preventDefault();
    this.setState({
      board: new Minesweeper.Board(event.target.value),
      level: event.target.value
    });
  },

  gameOver: function() {
    return (this.state.board.gameLost() || this.state.board.gameWon());
  },

  endGame: function() {
    this.setState({ gameOver: true});
  },

  render: function() {
    var gameMessage = "";

    if (this.gameOver()) {
      var message = (this.state.board.gameWon() ? "You Win!" : "You Lose!");
      gameMessage = (
        <div className="game-result">
          <div>
            <p>{ message }</p>
            <button onClick={ this.restartGame }>Restart Game</button>
          </div>
        </div>
      );
    }

    return (
      <div className="game">
        { gameMessage }
        <h2>Minesweeper</h2>
        <p>(alt + click) to flag tile</p>
        <label>difficulty:</label>
        <select value={ this.state.value } onChange={ this.handleLevel }>
          <option value='easy'>easy</option>
          <option value='medium'>medium</option>
          <option value='expert'>expert</option>
        </select>
        <Board
          board={ this.state.board }
          updateGame={ this.updateGame }
          level={ this.state.level }
          handleClick={ this.handleClick } />
      </div>
    );
  }
});

module.exports = Game;
