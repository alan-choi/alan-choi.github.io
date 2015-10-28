(function() {

if (typeof Asteroids === 'undefined'){
  window.Asteroids = {};
}

  var Asteroid = window.Asteroids.Asteroid = function(options) {
   options.color = Asteroid.COLOR;
   options.pos = options.pos || options.game.randomPos();
   options.radius = Asteroid.RADIUS;
   options.vel = options.vel || Asteroids.Utils.randomVec(Asteroid.SPEED);
   Asteroids.MovingObject.call(this, options);
  };

  Asteroid.COLOR = '#696969';
  Asteroid.RADIUS = 30;
  Asteroid.SPEED = 3;

  Asteroids.Utils.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      this.game.subtractLife();
      otherObject.relocate();
    }
  };
})();
