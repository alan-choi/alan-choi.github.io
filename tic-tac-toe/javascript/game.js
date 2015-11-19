(function(){
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var Game = window.TTT.Game = function (board, computer) {
    this.board = board;
    this.computerPlayer = computer;
    this.counter = 0;
  };

  Game.prototype.recordMoveFromHuman = function(move) {
    this.board.updateBoard(move, "X");
  };

  Game.prototype.computerPlay = function() {
    this.computerPlayer.move(this, "O");
  };

  Game.prototype.validMove = function(pos) {
    return !this.board.grid[pos[0]][pos[1]];
  };
})();
