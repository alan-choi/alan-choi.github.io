(function() {
  if (typeof window.Minesweeper === 'undefined') {
    window.Minesweeper = {};
  }

  var Tile = window.Minesweeper.Tile = function(board, pos) {
    this.board = board;
    this.pos = pos;
    this.flagged = false;
    this.explored = false;
    this.isBomb = false;
  };

  // count the number of neighbors that are bombs
  Tile.prototype.tileValue = function() {
    var bombCount = 0;

    this.neighbors().forEach(function(tile) {
      if (tile.isBomb) {
        bombCount ++;
      }
    });

    return bombCount;
  };

  //explore all tiles if not a bomb and value = 0
  Tile.prototype.explore = function() {
    if (this.flagged || this.explored) {
      return this;
    }

    this.explored = true;
    if (!this.isBomb && this.tileValue() === 0) {
      this.neighbors().forEach(function(tile) {
        tile.explore();
      });
    }
  };

  //returns an array of tile objects
  Tile.prototype.neighbors = function() {
    var deltas = [[-1, -1], [-1,  0], [-1,  1], [ 0, -1],
                [ 0,  1], [ 1, -1], [ 1,  0], [ 1,  1]];
    var nearCords = [];

    deltas.forEach(function(delta){
      var newPos = [delta[0] + this.pos[0], delta[1] + this.pos[1]];
      if (this.board.validCord(newPos)){
        nearCords.push(newPos);
      }
    }.bind(this));
    return nearCords.map(function(cord){
      return this.board.grid[cord[0]][cord[1]];
    }.bind(this));
  };

  Tile.prototype.plantBomb = function() {
    this.isBomb = true;
  };

  Tile.prototype.toggleFlag = function() {
    if (!this.explored) {
      this.flagged = !this.flagged;
      return true;
    }

    return false;
  };

  var Board = window.Minesweeper.Board = function(difficulty){
    if (difficulty === 'easy') {
      this.gridSize = 10;
      this.totalBombs = 10;
    } else if (difficulty === 'medium') {
      this.gridSize = 20;
      this.totalBombs = 40;
    } else if (difficulty === 'expert') {
      this.gridSize = 25;
      this.totalBombs = 70;
    }

    this.grid = [];
    this.generateGrid();
    this.setBombs();
  };

  Board.prototype.generateGrid = function() {
    for (var i = 0; i < this.gridSize; i++) {
      this.grid.push([]);
      for (var j = 0; j < this.gridSize; j++) {
        var tile = new Minesweeper.Tile(this, [i, j]);
        this.grid[i].push(tile);
      }
    }
  };

  //check to only include positions in the grid
  Board.prototype.validCord = function(position) {
    var row = position[0];
    var col = position[1];

    return (row >= 0 && row < this.gridSize &&
      col >= 0 && col < this.gridSize);
  };

  Board.prototype.setBombs = function() {
    var totalSetBombs = 0;

    while (totalSetBombs < this.totalBombs) {
      var row = Math.floor(Math.random() * (this.gridSize - 1));
      var col = Math.floor(Math.random() * (this.gridSize - 1));
      var tile = this.grid[row][col];

      if (!tile.isBomb) {
        tile.plantBomb();
        totalSetBombs ++;
      }
    }
  };

  Board.prototype.gameLost = function() {
    var lost = false;
    this.grid.forEach(function(row){
      row.forEach(function(tile) {
        if (tile.isBomb && tile.explored) {
         lost = true;
       }
      });
    });

    return lost;
  };

  Board.prototype.gameWon = function() {
    var correctFlags = 0;
    this.grid.forEach(function(row) {
      row.forEach(function(tile) {
        if (tile.isBomb && tile.flagged) {
          correctFlags ++;
        }
      });
    });
    return correctFlags === this.totalBombs;
  };

  Board.prototype.revealAll = function() {
    this.grid.forEach(function(row) {
      row.forEach(function(tile) {

        if (!tile.flagged) {
          tile.explored = true;
        }
      });
    });
  };

  module.exports = {
    Board: Board,
    Tile: Tile
  };
})();
