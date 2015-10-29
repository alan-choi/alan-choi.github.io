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
  Asteroid.RADIUS = 57;
  Asteroid.SPEED = 2;

  Asteroids.Utils.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      this.game.subtractLife();
      otherObject.relocate();
    }
  };

  Asteroid.prototype.isWrappable = true;

  Asteroid.prototype.draw = function(ctx) {
    // var imageNum =(Math.floor(Math.random() * 5) + 1);
    var imageNum =1;
    var player = new Image(60, 60);
    player.src = "images/"+imageNum+".png";
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.drawImage(player, -50, -60);
    ctx.restore();
  };
})();
