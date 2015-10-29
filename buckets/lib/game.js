(function(){
  if (typeof Asteroids === 'undefined'){
    window.Asteroids = {};
  }

  var Game = window.Asteroids.Game = function() {
    this.asteroids = [];
    this.ships = [];
    this.baskets = [];
    this.score = 0;
    this.lives = 5;
    this.displayStats();
    this.addAsteroids();
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 400;
  Game.NUM_ASTEROIDS = 4;

  Game.prototype.displayStats = function(){
    document.getElementById("game-score").innerHTML= this.score;
    document.getElementById("game-lives").innerHTML= this.lives;
  };

  Game.prototype.scorePoint = function() {
    this.score += 2;
    this.displayStats();
  };

  Game.prototype.subtractLife = function() {
    this.lives -= 1;
    this.displayStats();
    if (this.lives <= 0) {
      document.getElementById("game-over").innerHTML = "No more lives.. hit 'esc' to resart";
    }
  };

  Game.prototype.add = function(object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    } else if (object instanceof Asteroids.Basket){
      this.baskets.push(object);
    }
  };

  Game.prototype.addBasket = function() {
    var basket = new Asteroids.Basket({
      pos: this.randomPos(),
      game: this
    });
    this.add(basket);
    return basket;
  };

  Game.prototype.addShip = function() {
    var ship = new Asteroids.Ship({
      pos: this.randomPos(),
      game: this
    });
    this.add(ship);
    return ship;
  };

  Game.prototype.addAsteroids = function() {
    for(var i = 0; i < Game.NUM_ASTEROIDS; i++){
      this.asteroids.push(new Asteroids.Asteroid({game: this}));
    }
  };

  Game.prototype.randomPos = function(){
    return [ Math.floor(Math.random()*Game.DIM_X),
             Math.floor(Math.random()*Game.DIM_Y) ];
  };

  Game.prototype.draw = function(ctx){
    var objects = this.allObjects();

    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    objects.forEach(function(object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function(){
    var objects = this.allObjects();
    objects.forEach(function(object){
      if (object instanceof Asteroids.Ship ||
          object instanceof Asteroids.Asteroid){
        object.move();
      }
    });
  };

  // Game.prototype.wrap = function(pos){
  //   if(pos[0] >= Game.DIM_X){
  //     return [0, pos[1]];
  //   } else if (pos[1] >= Game.DIM_Y){
  //     return [pos[0], 0];
  //   } else {
  //     return pos;
  //   }
  // };
  Game.prototype.wrap = function (pos) {
  return [
    wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
  ];

  function wrap(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }
};

  Game.prototype.allObjects = function () {
   return [].concat(this.ships, this.asteroids, this.baskets);
 };

 Game.prototype.checkCollisions = function () {
   var game = this;

   this.allObjects().forEach(function (obj1) {
     game.allObjects().forEach(function (obj2) {
       if (obj1 == obj2) {
         // don't allow self-collision
         return;
       }

       if (obj1.isCollidedWith(obj2)) {
         obj1.collideWith(obj2);
       }
     });
   });
 };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) |(pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.step = function(){
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function(object){
    if (object instanceof Asteroids.Asteroid) {
      var idx = this.asteroids.indexOf(object);
      this.asteroids[idx] = new Asteroids.Asteroid({ game: this });
    }
  };

})();
