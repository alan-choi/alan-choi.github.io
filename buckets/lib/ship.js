(function(){
  if (typeof Asteroids === 'undefined'){
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship =  function (options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = Ship.COLOR;

    Asteroids.MovingObject.call(this, options);
  };

  Ship.COLOR = '#CC0000';
  Ship.RADIUS = 25;

  Asteroids.Utils.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx) {
    ctx.globalCompositeOperation='destination-over';

    var ball = new Image(25, 25);
    ball.src = "images/basketball.png";
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.drawImage(ball, -25, -25);
    ctx.restore();
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPos();
    this.vel = [0,0];
  };

  Ship.prototype.isWrappable = false;

  Ship.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Basket) {
      this.game.scorePoint();
      otherObject.relocate();
    }
  };
  Ship.prototype.keepInBounds = function() {

  };

})();
