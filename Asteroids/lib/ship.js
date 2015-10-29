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

  Ship.COLOR = '#FF6600';
  Ship.RADIUS = 25;

  Asteroids.Utils.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx) {
    var ball = new Image();
    ball.src = "images/basketball.png";
    ctx.drawImage(ball, this.pos[0], this.pos[1]);
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPos();
    this.vel = [0,0];
  };

  Ship.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Basket) {
      this.game.scorePoint();
      otherObject.relocate();
    }
  };

})();
