var Board = require('./board');
var React = require('react');
var Minesweeper = require('../minesweeper_logic');

var Game = React.createClass({
  getInitialState: function() {
    var board = new Minesweeper.Board('easy');
    return {
      board: board,
      level: 'easy'
     };
  },

  restartGame: function() {
    this.setState({ board: new Minesweeper.Board(this.state.level) });
  },

  updateGame: function(tile, flagged) {
    if (flagged) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }

    this.setState({ board: this.state.board });
  },

  handleLevel: function(event) {
    event.preventDefault();
    this.setState({
      board: new Minesweeper.Board(event.target.value),
      level: event.target.value
    });
  },

  render: function() {
    var gameMessage = "";

    if (this.state.board.gameLost() || this.state.board.gameWon()) {
      this.state.board.revealAll();
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
          level={ this.state.level } />
      </div>
    );
  }
});

module.exports = Game;
