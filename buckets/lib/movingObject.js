(function (){

  if (typeof Asteroids === 'undefined'){
    window.Asteroids = {};
  }

  var MovingObject = window.Asteroids.MovingObject = function(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };

  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, false);

    ctx.fill();
  };

  MovingObject.prototype.move = function(){
    this.pos = [(this.pos[0] + this.vel[0]),(this.pos[1] + this.vel[1])];
    this.pos = this.game.wrap(this.pos);
  };

  MovingObject.prototype.isCollidedWith = function(otherObject){
    var dx = this.pos[0] - otherObject.pos[0];
    var dy = this.pos[1] - otherObject.pos[1];
    var distance = Math.sqrt(dx*dx + dy*dy);
    return distance < (this.radius + otherObject.radius);
  };

  MovingObject.prototype.collideWith = function(otherObject){
    // debugger;
    // this.game.remove(otherObject);
    // this.game.remove(this);
  };

  MovingObject.prototype.isWrappable = true;

})();
