(function() {

if (typeof Asteroids === 'undefined'){
  window.Asteroids = {};
}

  var Asteroid = window.Asteroids.Asteroid = function(pos, game) {
    this.vel = Asteroids.Utils.randomVec(3);
    Asteroids.MovingObject.call(this, pos, this.vel, Asteroid.RADIUS, Asteroid.COLOR, game);
  };

  Asteroid.COLOR = '#696969';
  Asteroid.RADIUS = 30;

  Asteroids.Utils.inherits(Asteroid, Asteroids.MovingObject);

})();
