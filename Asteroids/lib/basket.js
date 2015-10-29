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
  Basket.RADIUS = 40;

  Asteroids.Utils.inherits(Basket, Asteroids.MovingObject);

  Basket.prototype.draw = function(ctx) {
    var hoop = new Image();
    hoop.src = "images/hoop.png";
    ctx.drawImage(hoop, this.pos[0], this.pos[1]);
  };

  Basket.prototype.relocate = function() {
    this.pos = this.game.randomPos();
    this.vel = [0,0];
  };

})();
