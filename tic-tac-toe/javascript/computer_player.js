(function(){
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var ComputerPlayer = window.TTT.ComputerPlayer = function() {
  };

  ComputerPlayer.prototype.move = function(game, mark) {
    var node = new TTT.TileNode(game, game.board, mark);
    var possibleMoves = node.children();
    var winningMove;
    var safeMoves = [];
    var randomIdx;
    var randomNode;

    for(var i = 0; i < possibleMoves.length; i++) {
      if (possibleMoves[i].isWinningNode(mark)) {
        winningMove = possibleMoves[i];
      }
    }

    for(var j = 0; j < possibleMoves.length; j++) {
      if (!possibleMoves[j].isLosingNode(mark)) {
        safeMoves.push(possibleMoves[j]);
      }
    }

    if (winningMove) {
      game.board.updateBoard(winningMove.pos, mark);
    } else if (safeMoves.length !== 0){
      randomIdx = Math.floor(Math.random()*safeMoves.length);
      randomNode = safeMoves[randomIdx];
      console.log("not losing move");
      game.board.updateBoard(randomNode.pos, mark);
    } else {
      console.log("something went wrong or game is over");
    }
    game.counter = 0;
  };
})();
