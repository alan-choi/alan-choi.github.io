(function(){
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var Board = window.TTT.Board = function() {
    this.grid = this.makeGrid();
  };

  Board.prototype.makeGrid = function() {
    var grid = [];

    for (var i = 0; i < 3; i ++) {
      grid.push([]);
      for (var j = 0; j < 3; j++) {
        grid[i].push(null);
      }
    }
    return grid;
  };

  Board.prototype.updateBoard = function(move, mark) {
    this.grid[move[0]][move[1]] = mark;
    var $el = $("li").filter('[pos="'+move.toString()+'"]');
    $el.html(mark);
    $el.addClass("revealed");
  };

  Board.prototype.tied = function() {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++){
        if (!this.grid[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  Board.prototype.gameover = function() {
    return this.won() || this.tied();
  };

  Board.prototype.winner = function() {
    var rows = this.grid;
    var cols = this.transposeGrid();
    var diags = this.diagonals();
    var allChecks = rows.concat(cols).concat(diags);
    for(var i = 0; i < allChecks.length; i++){
      if (this.threeInARow(allChecks[i])){
        return allChecks[i][0];
      }
    }
    return null;
  };

  Board.prototype.won = function() {
    return this.winner() !== null;
  };

  Board.prototype.transposeGrid = function() {
    var grid = this.grid;
    var transGrid = [[], [], []];
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[i].length; j++){
        transGrid[j].push(grid[i][j]);
      }
    }
    return transGrid;
  };

  Board.prototype.diagonals = function() {
    return [[this.grid[0][0], this.grid[1][1], this.grid[2][2]],
     [this.grid[0][2], this.grid[1][1], this.grid[2][0]]];
  };

  Board.prototype.threeInARow = function(row) {
    if (row[0] === row[1] && row[0] === row[2] && row[0]) {
      return true;
    }
    return false;
  };
})();
