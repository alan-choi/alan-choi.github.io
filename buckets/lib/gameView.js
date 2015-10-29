(function() {

  if (typeof Asteroids === 'undefined'){
    window.Asteroids = {};
  }

  var GameView = window.Asteroids.GameView = function(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.ship = this.game.addShip();
    this.basket = this.game.addBasket();
  };

  GameView.MOVES = {
    "up": [0,-1],
    "right": [1,0],
    "down": [0,1],
    "left": [-1,0]
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.power(move); });
    });

    key("esc", function () { location.reload();});
    // key("space", function () { this.stop();}.bind(this));
  };

  GameView.prototype.start = function(){
    var that = this;
    this.timer = setInterval(function(){
      that.game.step();
      that.game.draw(that.ctx);
    }, 1000 / Asteroids.Game.FPS );

      this.bindKeyHandlers();
  };

  GameView.prototype.stop = function () {
  clearInterval(this.timer);
};
})();
