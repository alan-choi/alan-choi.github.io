(function(){
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var TileNode = window.TTT.TileNode = function(game, board, mark, pos) {
    this.game = game;
    this.board = board;
    this.mark = mark;
    this.pos = pos || null;
  };

  TileNode.prototype.isLosingNode = function(otherMark) {
    //losing node if winner is player's mark
    if (this.board.winner() || this.board.tied()){
      return this.board.winner() === "X";
    }
    //computer's turn return true if all children are losing nodes
    //player's turn return true if any children are losing nodes
    if (this.mark === otherMark) {
      return this.children().every(function(child) {
        return child.isLosingNode(otherMark);
      });
    } else {
      return this.children().some(function(child){
        return child.isLosingNode(otherMark);
      });
    }
  };

  TileNode.prototype.isWinningNode = function(otherMark) {
    //winning node if winner is the computer
    if (this.board.winner() || this.board.tied()){
      return this.board.winner() === otherMark;
    }
    //computer's turn return true if any its children are winning
    //player's turn return true if all of its children are winning
    if (this.mark === otherMark) {
      //if any children are a winning node return true
      this.children().some(function(child){
        return child.isWinningNode(otherMark);
      });

    } else {
      //if every child is a winning node
      this.children().every(function(child) {
        return child.isWinningNode(otherMark);
      });
    }
  };

  TileNode.prototype.copyBoard = function(board) {
    var clone = [[], [], []];
    for (var i = 0; i < board.length; i ++) {
      for (var j = 0; j < board[i].length; j++){
        clone[i][j] = board[i][j];
      }
    }
    return clone;
  };

  TileNode.prototype.children = function() {
    var children = [];
    var dupBoard;
    var nextMark;
    var newNode;
    for(var i = 0; i < 3; i++) {
      for(var j = 0; j < 3; j++) {
        if (this.board.grid[i][j] !== null) {continue;}
          dupBoard = new TTT.Board();
          dupBoard.grid = this.copyBoard(this.board.grid);
          dupBoard.grid[i][j] = this.mark;
          nextMark = (this.mark === "X") ? "O" : "X";
          newNode = new TileNode(this.game, dupBoard, nextMark, [i, j]);
          children.push(newNode);
      }
    }
    return children;
  };
})();
