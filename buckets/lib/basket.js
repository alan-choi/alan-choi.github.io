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
  Basket.RADIUS = 5;

  Asteroids.Utils.inherits(Basket, Asteroids.MovingObject);

  Basket.prototype.draw = function(ctx) {
    var hoop = new Image(40, 40);
    hoop.src = "images/hoop.png";
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.drawImage(hoop, -40, -40);
    ctx.restore();
  };

  Basket.prototype.relocate = function() {
    this.pos = this.game.randomPos();
    this.vel = [0,0];
  };

})();
