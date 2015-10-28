(function(){
  if (typeof Asteroids === 'undefined'){
    window.Asteroids = {};
  }

  var Basket = Asteroids.Basket =  function (options) {
    options.radius = Basket.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = Basket.COLOR;

    Asteroids.MovingObject.call(this, options);
  };

  Basket.COLOR = '#CC0000';
  Basket.RADIUS = 30;

  Asteroids.Utils.inherits(Basket, Asteroids.MovingObject);

  Basket.prototype.relocate = function() {
    this.pos = this.game.randomPos();
    this.vel = [0,0];
  };

  Basket.prototype.relocate = function() {
    this.pos = this.game.randomPos();
    this.vel = [0,0];
  };

})();
