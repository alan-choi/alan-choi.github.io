(function(){
  if (typeof Asteroids === 'undefined'){
    window.Asteroids = {};
  }

  var Game = window.Asteroids.Game = function() {
    this.asteroids = this.addAsteroids();
  };

  Game.DIM_X = 700;
  Game.DIM_Y = 700;
  Game.NUM_ASTEROIDS = 10;

  Game.prototype.addAsteroids = function() {
    var asteroids = [];
    for(var i = 0; i < Game.NUM_ASTEROIDS; i++){
      asteroids.push(new Asteroids.Asteroid(this.randomPos(), this));
    }
    return asteroids;
  };

  Game.prototype.randomPos = function(){
    return [ Math.floor(Math.random()*Game.DIM_X),
             Math.floor(Math.random()*Game.DIM_Y) ];
  };

  Game.prototype.draw = function(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function(){
    this.asteroids.forEach(function(asteroid){
      asteroid.move();
    });
  };

  Game.prototype.wrap = function(pos){
    if(pos[0] >= Game.DIM_X){
      return [0, pos[1]];
    } else if (pos[1] >= Game.DIM_Y){
      return [pos[0], 0];
    } else {
      return pos;
    }
  };

  Game.prototype.checkColissions = function() {
    for (var i = 0; i < this.asteroids.length; i++){
      for (var j = (i+1); j < this.asteroids.length; j++){
        if (this.asteroids[i].isCollidedWith(this.asteroids[j])){
            this.asteroids[i].collideWith(this.asteroids[j]);
        }
      }
    }
  };

  Game.prototype.step = function(){
    this.moveObjects();
    this.checkColissions();
  };

  Game.prototype.remove = function(asteroid){
    var target = asteroid.pos;
    debugger
    this.asteroids.forEach(function(ast, idx){
      if (ast.pos === target){
        delete this.asteroids[idx];
      }
    });
  };

})();
