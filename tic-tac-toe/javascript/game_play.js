(function(){
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var GamePlay = window.TTT.GamePlay = function(game, $el) {
    this.game = game;
    this.$el = $el;
    this.bindEvents();
    this.setupBoard();
  };

  GamePlay.prototype.bindEvents = function() {
    this.$el.on("click", "li", (function(event){
      var $tile = $(event.currentTarget);
      this.makeMove($tile);
    }.bind(this)));
  };

  GamePlay.prototype.makeMove = function($tile) {
    var move = $tile.data("pos");
    if (this.game.validMove(move)){
      this.game.recordMoveFromHuman(move);
      this.game.computerPlay();
      this.checkWinner();
    } else {
      alert("invalid selection");
    }
  };

  GamePlay.prototype.checkWinner = function() {
    if (this.game.board.tied() && !this.game.board.winner()) {
      alert("cats game");
    }
    if (this.game.board.winner()) {
      alert("gameover '"+this.game.board.winner()+"' won.");
    }
  };

  GamePlay.prototype.setupBoard = function() {
    var $ul = $("<ul>");
    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        var $li = $("<li>");
        $li.attr("pos", [row, col]);
        $li.data("pos", [row, col]);
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  };
})();
