(function(React) {

var Game = React.createClass({
  getInitialState: function() {
    return {
      board: new Minesweeper.Board(10,10),
      gameOver: false,
      gameWon: false
    };
  },

  updateGame: function(position, input) {
    var grid = this.state.board.grid;
    var x = position[0];
    var y = position[1];
    if (input) {
      grid[x][y].toggleFlag();
    } else {
      grid[x][y].explore();
    }

    var won = this.state.board.won();
    var lost = this.state.board.lost();

    this.setState({gameWon: won, gameOver: (won || lost)});

  },

  render: function() {
    var grid = this.state.board.grid;
    var that = this;
    var gameMessage = "Minesweeper";
    if (this.state.gameWon) {
      gameMessage = "You Win!";
    } else if (this.state.gameOver) {
      gameMessage = "Womp Womp You Lose";
    }
    return (
      <div className="container">
        <h1>{gameMessage}</h1>
        <div className="board">
          { grid.map(function(row, ridx){
              return( <div>
                  { row.map(function(tile, cidx) {
                    return(
                      <Tile
                        boardTile={tile}
                        row={ridx}
                        col={cidx}
                        updateGame={that.updateGame}/>
                    );
                  })}
                </div>);
            })
          }
        </div>
      </div>
    );}
})();

React.render(<Game />, document.getElementById("minesweeper-game"));
})(window.React);
